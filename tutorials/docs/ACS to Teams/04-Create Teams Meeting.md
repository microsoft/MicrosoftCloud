---
title: 3. Dynamically Create a Microsoft Teams Meeting using Microsoft Graph
sidebar_position: 4
---

# Exercise 3

## Dynamically Create a Microsoft Teams Meeting using Microsoft Graph
In this exercise, you'll automate the process of creating a Microsoft Teams meeting link and passing to the ACS by using Azure Functions and Microsoft Graph.

![Create Teams Meeting](/img/acs-to-teams/3-create-teams-meeting-link.png "Create Teams Meeting")

1. You'll need to create an Azure Active Directory (AAD) app for Deamon app authentication. In this step, authentication will be handled in the backgroud with `app credentials`, and AAD app will use Application Permissions to make Microsoft Graph API calls. Microsoft Graph will be used to dynamically create a Microsoft Teams meeting and return the Teams meeting URL.

1. Perform the following steps to create an AAD app:
    1. Go to [Azure Portal](https://portal.azure.com) and select `Azure Active Directory`.
    1. Select the `App registration` tab followed by `+ New registration`.
    1. Fill in the new app registration form details as shown below and select `Register`:
        - Name: *ACS Teams Interop App*
        - Supported account types: *Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox)*
        - Redirect URI: leave this blank
    1. After the app is registered, go to `API permissions` and select `+ Add a permission`.
    1. Select `Microsoft Graph` followed by `Application permissions`.
    1. Select the **Calendars.ReadWrite** permission and then select `Add`.
    1. After adding the permissions, select `Grant admin consent for <your organization name>`.
    1. Go to the `Certificates & secrets` tab, select `+ New client secret`, and then select `Add`. 
    1. Copy the value of the secret into a local file. You'll use the value later in this exercise.
    1. Go to the `Overview` tab and copy the `Application (client) ID` and `Directory (tenant) ID` values into the same local file that you used in the previous step.

1. Open the `samples/acs-video-to-teams-meeting/server/typescript` project folder in Visual Studio Code.

1. Go to the `TeamsMeetingFunction` folder and create a `local.settings.json` file with the following values:

    - Use the values you copied into the local file to update the `TENANT_ID`, `CLIENT_ID` and `CLIENT_SECRET` values.
    - Define `USER_ID` with the user id that you'd like to create a Microsoft Teams Meeting. 
        >You can get your User ID from [Azure Portal](https://portal.azure.com), select `Azure Active Directory` and navigate to `Users` tab on the side bar. Search for your user name and select your user name to see the user details. Inside the user details, Object ID stands for User ID. Copy the `Object ID` and define as `USER_ID` in `local.settings.json`.
        ![Getting User ID from Azure Active Directory](/img/acs-to-teams/aad-user-id.png "Getting User ID from Azure Active Directory")

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "FUNCTIONS_WORKER_RUNTIME": "node",
            "TENANT_ID": "",
            "CLIENT_ID": "",
            "CLIENT_SECRET": "",
            "USER_ID": "",
            "ACS_CONNECTION_STRING": ""
        },
        "Host": {
            "LocalHttpPort": 7071,
            "CORS": "*",
            "CORSCredentials": false
        },
        "watchDirectories": [
            "Shared"
        ]
    }
    ```
    :::note

    `ACS_CONNECTION_STRING` will be used in the next exercise so you don't need to update it yet.

    :::

1. Open the `package.json` file in VS Code and note that the following Microsoft Graph and Identity packages are included:

    ```bash
    @azure/communication-identity
    @azure/identity
    @microsoft/microsoft-graph-client
    ```
1. Open a terminal window in the `typescript` folder and run the `npm install` command to install the application dependencies.

1. Open `Shared/graph.ts` and take a moment to expore the imports at the top of the file. This code handles importing authentication and client symbols that will be used in the Azure Function to call Microsoft Graph.

    ```typescipt
    import {startDateTimeAsync, endDateTimeAsync} from './dateTimeFormat';
    import {ClientSecretCredential} from '@azure/identity';
    import {Client} from '@microsoft/microsoft-graph-client';
    import {TokenCredentialAuthenticationProvider} from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
    import 'isomorphic-fetch';
    ```

    :::info

    You'll also see imports from `dateTimeFormat.ts` which will be used later in this exercise. `startDateTimeAsync` and `endDateTimeAsync` will be used while creating a Microsoft Teams meeting link to define start date and end date for the meeting.

    ::: 

1. Take a moment to examine `clientSecretCredential` and `appGraphClient`, they will be used later in the authentication process and when calling the Microsoft Graph API:

    ```typescript
    let clientSecretCredential;
    let appGraphClient;
    ```

1. Locate the `ensureGraphForAppOnlyAuth` function:
    - `ClientSecretCredential` uses the `Tenant Id`, `Client Id` and `Client Secret` values from the Azure Active Directory app.
    - The `authProvider` object is defined as an Azure Active Directory app that will authenticate in the background and use app-only permissions (such as **Calendars.ReadWrite**) to make Microsoft Graph API calls.

    ```typescript
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
    ``` 

1. Take a moment to explore the `createNewMeetingAsync` function. It posts data to the [Microsoft Graph Calendar Events API](https://learn.microsoft.com/graph/api/calendar-post-events?view=graph-rest-1.0&tabs=http) which dynamically creates an event in a user's calendar and returns the new event details:

    ```typescript
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
    ```

1. Go to `TeamsMeetingFunction/index.ts` and explore the Http Trigger function:
    - `createNewMeetingAsync` is imported from `graph.ts`. It handles creating and retrieving new event details.
    - `userId` is retrieved from `local.settings.json` inside the Http Trigger function. This is done by accessing the `USER_ID` environment variable by using `process.env.USER_ID`.
    - When the function is triggered, it calls `createNewMeetingAsync` with the defined user id and returns the new event details in `teamMeetingLink` parameter.
    - The function accesses the Teams meeting join URL by calling `meeting.onlineMeeting.joinUrl` and returns the value in the body of the response.

    ```typescript
    import { AzureFunction, Context, HttpRequest } from "@azure/functions";
    import createNewMeetingAsync from '../Shared/graph';

    let teamsMeetingLink;

    const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest){
        context.log("Request received");
        const userId = process.env.USER_ID;
        context.log('UserId', userId);
        
        teamsMeetingLink = await createNewMeetingAsync(userId);
        const body = JSON.stringify(teamsMeetingLink);
        const meeting = JSON.parse(body);
        context.log("meeting:", meeting);
        
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: meeting.onlineMeeting.joinUrl
        }    
    };

    export default httpTrigger;
    ```

1. Use a terminal window to run `npm start` in the `samples/acs-video-to-teams-meeting/server/typescript` folder to run the function locally. 

1. Now that the `TeamsMeetingFunction` is ready to use, let's call the function from the React app.

1. Go back to the `samples/acs-to-teams-meeting/client/react` folder in VS Code. Add a `.env` file into the folder with the following values:

    ```
    REACT_APP_TEAMS_MEETING_FUNCTION=http://localhost:7071/api/TeamsMeetingFunction

    REACT_APP_ACS_USER_FUNCTION=http://localhost:7071/api/ACSTokenFunction
    ```

    :::info

        These values will be passed into React as it builds so that you can easily change them as needed during the build process.
    
    :::

1. Open `samples/acs-to-teams-meeting/client/react/App.tsx` file in VS Code.

1. Locate the `teamsMeetingLink` state variable in the component. Remove the hardcoded teams link and replace it with empty quotes:

    ```typescript
    const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>('');
    ```

1. Locate the `useEffect` function and change it to look like the following. This handles calling the Azure Function you looked at earlier which creates a Teams meeting and returns the meeting join link:

    ```typescript
    useEffect(() => {
        const init = async () => {
            /* Commenting out for now
            setMessage('Getting ACS user');
            //Call Azure Function to get the ACS user identity and token
            let res = await fetch(process.env.REACT_APP_ACS_USER_FUNCTION as string);
            let user = await res.json();
            setUserId(user.userId);
            setToken(user.token);
            */
            
            setMessage('Getting Teams meeting link...');
            //Call Azure Function to get the meeting link
            res = await fetch(process.env.REACT_APP_TEAMS_MEETING_FUNCTION as string);
            let link = await res.text();
            setTeamsMeetingLink(link);
            setMessage('');
            console.log('Teams meeting link', link);

        }
        init();

    }, []);
    ```

1. Save the file before continuing.

1. Open another terminal window, `cd` into the `react` folder, and run `npm start` to build and run the application. 

1. After the application builds, you should see the ACS calling UI displayed and can then call into the Teams meeting that was dynamically created by Microsoft Graph.

1. Stop both of the terminal processes (React and Azure Functions) by entering `ctrl + c` in each terminal window.