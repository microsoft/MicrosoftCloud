---
title: 4. Dynamically Create an Azure Communication Services Identity and Token
sidebar_position: 4
---

# Exercise 4

## Dynamically Create an Azure Communication Services Identity and Token

In this exercise you'll learn how to dynamically retrieve user identity and token values from Azure Communication Services using Azure Functions. Once retrieved, the values will be passed to the ACS UI composite to enable a call to be made by a customer.

![Create ACS Identity and Token](/img/acs-to-teams/4-acs-identity-token.png "Create ACS Identity and Token")

1. Open `local.settings.json` and update the `ACS_CONNECTION_STRING` value with the ACS connection string you saved in an earlier exercise.

1. Open `samples/acs-to-teams-meeting/server/typescript/ACSTokenFunction/index.ts` in VS Code. 

1. Notice that it has the following import at the top of the file:

    ```typescript
    import { CommunicationIdentityClient } from '@azure/communication-identity';

    ```

1. The function performs the following tasks:
    - Gets the ACS connection string from an environment variable named `ACS_CONNECTION_STRING`.

        ```typescript
        const connectionString = process.env.ACS_CONNECTION_STRING;
        ```

    :::note

    This is the connection string value you added into the `local.settings.json` file earlier.

    :::
    
    - Creates a new `CommunicationIdentityClient` instance and passes the ACS connection string to it.

        ```typescript
        let tokenClient = new CommunicationIdentityClient(connectionString);
        ```

    - Creates an ACS user and gets a Voice Over IP token.

        ```typescript
        const user = await tokenClient.createUser();
        const userToken = await tokenClient.getToken(user, ["voip"]);
        ```

    - Sends the userId and token values back to the caller.

        ```typescript
        context.res = {
            body: { userId: user.communicationUserId, ...userToken }
        };
        ```

1. Go to the `samples/acs-to-teams-meeting/server/typescript` folder in a terminal window and run `npm start`.

1. Now that the Azure Functions are running locally, the client needs to be able to call into them to get the ACS user identity and token values.

1. Open `samples/acs-to-teams-meeting/client/react/App.tsx` file in your editor.

1. Locate the `userId` and `token` state variables in the component. Remove the hardcoded values and replace them with empty quotes:

    ```typescript
    const [userId, setUserId] = useState<string>('');
    const [token, setToken] = useState<string>('');
    ```

1.  Locate the `useEffect` function and change it to look like the following to enable calling the Azure Function to retrieve an ACS user identity and token: 

    ```typescript
    useEffect(() => {
        const init = async () => {
            setMessage('Getting ACS user');
            //Call Azure Function to get the ACS user identity and token
            let res = await fetch(process.env.REACT_APP_ACS_USER_FUNCTION as string);
            let user = await res.json();
            setUserId(user.userId);
            setToken(user.token);
            
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

1. Open a separate terminal and run `npm start` in the `react` folder. After it builds you should see the ACS calling UI displayed and you can call into the Teams meeting that was dynamically created by Microsoft Graph.

1. Stop both of the terminal processes (React and Azure Functions) by selecting `ctrl + c`.

1. Commit your git changes and push them to your GitHub repository using VS Code:
    - Select the git icon (3rd one down in the VS Code toolbar).
    - Enter a commit message and select `Commit`.
    - Select `Sync Changes`.