import {startDateTimeAsync, endDateTimeAsync} from './dateTimeFormat';
import {ClientSecretCredential} from '@azure/identity';
import {Client} from '@microsoft/microsoft-graph-client';
import {TokenCredentialAuthenticationProvider} from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import 'isomorphic-fetch';

let clientSecretCredential;
let appGraphClient;

function ensureGraphForAppOnlyAuth() {

  if (!clientSecretCredential) {
    clientSecretCredential = new ClientSecretCredential(
      process.env.TENANT_ID,
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    );
  }

  if (!appGraphClient) {
    const authProvider = new TokenCredentialAuthenticationProvider(
      clientSecretCredential, {
        scopes: [ 'https://graph.microsoft.com/.default' ]
      });

    appGraphClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
  }
}

async function createNewMeetingAsync(userId) {
    ensureGraphForAppOnlyAuth();
    let startTime = await startDateTimeAsync();
    let endTime = await endDateTimeAsync();
    const newMeeting = `/users/${userId}/calendar/events`;
    
    const event = {
      subject: 'Customer Service Meeting',
      start: {
          dateTime: startTime,
          timeZone: 'UTC'
      },
      end: {
          dateTime: endTime,
          timeZone: 'UTC'
      },
      isOnlineMeeting: true
    };
    
    const newEvent = await appGraphClient.api(newMeeting).post(event);    
    return newEvent;     
}
      
export default createNewMeetingAsync;