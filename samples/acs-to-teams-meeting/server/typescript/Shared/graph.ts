import {startDateTimeAsync, endDateTimeAsync} from './dateTimeFormat';
import 'isomorphic-fetch';
import {ClientSecretCredential} from '@azure/identity';
import {Client} from '@microsoft/microsoft-graph-client';
import {TokenCredentialAuthenticationProvider} from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { Console } from 'console';
let _clientSecretCredential = undefined;
let _appClient = undefined;
let startTime = undefined;
let endTime = undefined;

function ensureGraphForAppOnlyAuth() {

  if (!_clientSecretCredential) {
    _clientSecretCredential = new ClientSecretCredential(
      '<YOUR_TENANT_ID>',
      '<YOUR_CLIENT_ID>',
      '<YOUR_CLIENT_SECRET>'
    );
  }

  if (!_appClient) {
    const authProvider = new TokenCredentialAuthenticationProvider(
      _clientSecretCredential, {
        scopes: [ 'https://graph.microsoft.com/.default' ]
      });

    _appClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
  }
}

async function CreateNewMeetingAsync(userId) {
    ensureGraphForAppOnlyAuth();
    startTime = await startDateTimeAsync();
    endTime = await endDateTimeAsync();
    const newMeeting = '/users/' + userId + '/calendar/events';
    
    const event = {
      subject: 'Customer Care Meeting',
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
    
    const newEvent = await _appClient?.api(newMeeting).post(event);
    
    console.log(newEvent);
    
    return newEvent;     
}
      
export default CreateNewMeetingAsync;