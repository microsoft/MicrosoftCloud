---
title: 4. Dynamically Create an Azure Communication Services Identity and Token
sidebar_position: 4
---

# Exercise 4

## Dynamically Create an Azure Communication Services Identity and Token

In this exercise you'll learn how to dynamically retrieve user identity and token values from Azure Communication Services using Azure Functions. Once retrieved, the values will be passed to the ACS UI composite to enable a call to be made by a customer.

![Create ACS Identity and Token](/img/acs-to-teams/4-acs-identity-token.png "Create ACS Identity and Token")

1. Open `local.settings.json` and update the `ACS_CONNECTION_STRING` value with the ACS connection string you saved in an earlier exercise.

2. Open `Startup.cs` in Visual Studio 2022 and explore the second `AddSingleton` calling in `Configure` method.

3. This process creates `CommunicationIdentityClient` using the connection string set to `ACS_CONNECTION_STRING` in `local.settings.json`. The `CommunicationIdentityClient` is used for creating ACS user ID and tokens.

    ```csharp
    builder.Services.AddSingleton(static p =>
    {
        var config = p.GetRequiredService<IConfiguration>();
        var connectionString = config.GetValue<string>("ACS_CONNECTION_STRING");
        return new CommunicationIdentityClient(connectionString);
    });
    ```
4. Open `ACSTokenFunction.cs` to see the `ACSTokenFunction` class constructor and field definitions. 
    - It defines the scope (`CommunicationTokenScope.VoIP`) as a static field when getting the token :
        ```csharp
        private static readonly CommunicationTokenScope[] Scopes = new[]
        {
            CommunicationTokenScope.VoIP,
        };
        ```
    - The `CommunicationIdentityClient` instance written in `Startup.cs` is set to the `_tokenClient` field at the constructor.
        ```csharp
        private readonly CommunicationIdentityClient _tokenClient;
        
        public ACSTokenFunction(CommunicationIdentityClient tokenClient)
        {
            _tokenClient = tokenClient;
        }
        ```

5. Explore the `Run` method in `ACSTokenFunction.cs`. This method is called when the Azure Function is triggered. It creates a new ACS user using `CreateUserAsync` method, and creates the access token for the video calls (`VoIP`) using `GetTokenAsync` method. Then it returns the user ID and token as a JSON object.

    ```csharp
    [FunctionName("ACSTokenFunction")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
        var user = await _tokenClient.CreateUserAsync();
        var userToken = await _tokenClient.GetTokenAsync(user, Scopes);
    
        return new OkObjectResult(new 
        { 
            userId = user.Value.Id, 
            userToken.Value.Token, 
            userToken.Value.ExpiresOn 
        });
    }
    ```
6. Run the program by pressing `F5` or `debug` on the menu bar. The Azure Functions will start running locally.

7. Now that the Azure Functions are running locally, the client (React app) needs to be updated to call the Azure Functions.

8. Open `App.tsx` in the `client` folder with VSCode. (`samples/acs-to-teams-meeting/client/react/App.tsx`). 

9. Locate the `userId` and `token` state variables in the component. Remove the hardcoded values and replace them with empty quotes:

    ```typescript
    const [userId, setUserId] = useState<string>('');
    const [token, setToken] = useState<string>('');
    ```

10. Locate the `useEffect` function and change it to look like the following to enable calling the Azure Function to retrieve an ACS user identity and token: 

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
            res = await fetch(process.env.REACT_APP_TEAMS_MEETING_FUNCTION as string); // Please remove let
            let link = await res.text();
            setTeamsMeetingLink(link);
            setMessage('');
            console.log('Teams meeting link', link);
        }
        init();

    }, []);
    ```

11. Save the file before continuing.

12. Open a terminal and run `npm start` in the `react` folder. After it builds you should see the ACS calling UI displayed and you can call into the Teams meeting that was dynamically created by Microsoft Graph.

13. Terminate the React app by pressing `Ctrl+C` in the terminal. You can also terminate the Azure Functions by pressing `Shift + F5` or `Stop Debugging` in the debug menu in Visual Studio.

14. Commit your git changes and push them to your GitHub repository using VS Code:
    - Select the git icon (3rd one down in the VS Code toolbar).
    - Enter a commit message and select `Commit`.
    - Select `Sync Changes`
