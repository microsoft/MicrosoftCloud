import { Injectable } from '@angular/core';
import { Msal2Provider, Providers, ProviderState } from '@microsoft/mgt';
import { TeamsDialogData } from '../textarea-dialog/dialog-data';
import { FeatureFlagsService } from './feature-flags.service';
import { ChatMessage, ChatMessageInfo } from '../shared/interfaces';
import { DriveItem } from '@microsoft/microsoft-graph-types';

// Retrieved from .env file value by using webpack.partial.js and ngx-build-plus
declare const AAD_CLIENT_ID: string;
declare const TEAM_ID: string;
declare const CHANNEL_ID: string;

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private featureFlags: FeatureFlagsService) { }

  init() {
    if (!this.featureFlags.microsoft365Enabled) return;

    if (!Providers.globalProvider) {
      console.log('Initializing Microsoft Graph global provider...');
      Providers.globalProvider = new Msal2Provider({
        clientId: AAD_CLIENT_ID,
        scopes: ['User.Read', 'Presence.Read', 'Chat.ReadWrite', 'Calendars.Read', 
                 'ChannelMessage.Read.All', 'ChannelMessage.Send', 'Files.Read.All', 'Mail.Read']
      });
    }
    else {
      console.log('Global provider already initialized');
    }
  }

  loggedIn() {
    if (Providers.globalProvider) {
      return Providers.globalProvider.state === ProviderState.SignedIn;
    }
    return false;
  }

  async searchFiles(query: string) {
    const files: DriveItem[] = [];

    if (!query) return files;

    const filter = {
      "requests": [
        {
          "entityTypes": [
            "driveItem"
          ],
          "query": {
            "queryString": `${query} AND ContentType:Document`
          }
        }
      ]
    };

    const searchResults = await Providers.globalProvider.graph.client.api('/search/query').post(filter);

    if (searchResults.value.length !== 0) {
      for (const hitContainer of searchResults.value[0].hitsContainers) {
        if (hitContainer.hits) {
          for (const hit of hitContainer.hits) {
            files.push(hit.resource);
          }
        }
      }
    }
    return files;
  }

  async searchChatMessages(query: string) {
    const chatIds: ChatMessageInfo[] = [];
    const promises: Promise<ChatMessage>[] = [];
    const messages: ChatMessage[] = [];

    if (!query) return messages;

    const filter = {
      "requests": [
        {
          "entityTypes": [
            "chatMessage"
          ],
          "query": {
            "queryString": `${query}`
          },
          "from": 0,
          "size": 25
        }
      ]
    };

    const searchResults = await Providers.globalProvider.graph.client.api('/search/query').post(filter);

    // Get all of the required IDs to retrieve the chat messages
    if (searchResults.value.length !== 0) {
      for (const hitContainer of searchResults.value[0].hitsContainers) {
        if (hitContainer.hits) {
          for (const hit of hitContainer.hits) {
            chatIds.push({
              teamId: hit.resource.channelIdentity.teamId,
              channelId: hit.resource.channelIdentity.channelId,
              messageId: hit.resource.id,
              summary: hit.summary
            });
          }
        }
      }

      // Retrieve the chat messages using the IDs
      for (const chat of chatIds) {
        promises.push(
          Providers.globalProvider.graph.client.api(`/teams/${chat.teamId}/channels/${chat.channelId}/messages/${chat.messageId}`).get()
        );
      }
      const results = await Promise.all(promises.map(p => p.catch(e => e)));
      // Filter out any errors or undefined results in case of a 404
      const validResults = results.filter(result => !(result instanceof Error) && result !== undefined);
      for (const msg of validResults) {
        messages.push({
          id: msg.id,
          teamId: msg.channelIdentity.teamId,
          channelId: msg.channelIdentity.channelId,
          summary: chatIds.find(chat => chat.messageId === msg.id)?.summary as string,
          body: msg.body.content,
          from: msg.from.user.displayName,
          date: msg.createdDateTime,
          webUrl: msg.webUrl
        });
      }
    }

    return messages;
  }

  async searchEmailMessages(query: string) {
    if (!query) return [];
    // The $search operator will search the subject, body, and sender fields automatically
    const url = `https://graph.microsoft.com/v1.0/me/messages?$search="${query}"&$select=subject,bodyPreview,from,toRecipients,receivedDateTime,webLink`;
    const response = await Providers.globalProvider.graph.client.api(url).get();
    return response.value;
  }

  async searchCalendarEvents(query: string) {
    if (!query) return [];
    const startDateTime = new Date();
    const endDateTime = new Date(startDateTime.getTime() + (7 * 24 * 60 * 60 * 1000));
    const url = `/me/events?startdatetime=${startDateTime.toISOString()}&enddatetime=${endDateTime.toISOString()}&$filter=contains(subject,'${query}')&orderby=start/dateTime`;

    const response = await Providers.globalProvider.graph.client.api(url).get();
    return response.value;
  }

  async sendTeamsChat(message: string): Promise<TeamsDialogData> {
    if (!message) new Error('No message to send.');
    if (!TEAM_ID || !CHANNEL_ID) new Error('Team ID or Channel ID not set in environment variables. Please set TEAM_ID and CHANNEL_ID in the .env file.');

    const url = `https://graph.microsoft.com/v1.0/teams/${TEAM_ID}/channels/${CHANNEL_ID}/messages`;
    const body = {
      "body": {
        "contentType": "html",
        "content": message
      }
    };
    const response = await Providers.globalProvider.graph.client.api(url).post(body);
    return {
      id: response.id,
      teamId: response.channelIdentity.teamId,
      channelId: response.channelIdentity.channelId,
      message: response.body.content,
      webUrl: response.webUrl,
      title: 'Send Teams Chat'
    };
  }

}
