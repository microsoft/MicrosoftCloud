---
title: 3. Dynamically Create a Microsoft Teams Meeting using Microsoft Graph
sidebar_position: 3
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

3. Open the `samples/acs-to-teams-meeting/server/csharp/GraphACSFunctions.sln` in Visual Studio 2022.

4. Go to the `GraphACSFunctions` project and create a `local.settings.json` file with the following values:

    - Use the values you copied into the local file to update the `TENANT_ID`, `CLIENT_ID` and `CLIENT_SECRET` values.
    - Define `USER_ID` with the user id that you'd like to create a Microsoft Teams Meeting. 

    :::note

    You can get your User ID from [Azure Portal](https://portal.azure.com). Select `Azure Active Directory` and navigate to the `Users` tab on the side bar. Search for your user name and select it to see the user details. Inside the user details, Object ID represents the User ID. Copy the `Object ID` value and use it for the `USER_ID` value in `local.settings.json`.

    ![Getting User ID from Azure Active Directory](/img/acs-to-teams/aad-user-id.png "Getting User ID from Azure Active Directory")

    :::

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

5. Open the `GraphACSFunctions` project in the Solution Explorer. Note that the following Microsoft Graph and Identity packages are included by using `PackageReference` tags:

    ```xml
    <PackageReference Include="Azure.Communication.Identity" Version="1.2.0" />
    <PackageReference Include="Azure.Identity" Version="1.8.2" />
    <PackageReference Include="Microsoft.Graph" Version="4.53.0" />
    ```

6. Go to `Startup.cs` and check the beginning of the `Configure` method:
    - This code creates a `GraphServiceClient` for calling Microsoft Graph from Azure Functions.
    - You can make Microsoft Graph API calls with app-only permissions (such as **Calendars.ReadWrite**) by passing `ClientSecretCredential` to the `GraphServiceClient` constructor. The `ClientSecretCredential` uses the `Tenant Id`, `Client Id` and `Client Secret` values from the Azure Active Directory app.

    ```csharp
    var config = p.GetRequiredService<IConfiguration>();
    var clientSecretCredential = new ClientSecretCredential(
        config. GetValue<string>("TENANT_ID"),
        config. GetValue<string>("CLIENT_ID"),
        config. GetValue<string>("CLIENT_SECRET")
    );

    return new GraphServiceClient(
        client Secret Credential,
        new[] { "https://graph.microsoft.com/.default" }
    );
    ```
    
8. Take a moment to explore the `CreateMeetingEventAsync` method.

    - It recieves `GraphServiceClient` and `IConfiguration`, sets them to the field property. 
    - It posts data to the [Microsoft Graph Calendar Events API](https://learn.microsoft.com/graph/api/calendar-post-events?view=graph-rest-1.0&tabs=http) which dynamically creates an event in a user's calendar and returns the new event details.
    - It also returns created event data.

    ```csharp
    using System;
    using System.Threading.Tasks;
    using Microsoft.Graph;
    using Microsoft.Extensions.Configuration;
    
    namespace GraphACSFunctions.Services;
    
    public class GraphService : IGraphService
    {
        private readonly GraphServiceClient _graphServiceClient;
        private readonly IConfiguration _configuration;
    
        public GraphService(GraphServiceClient graphServiceClient, IConfiguration configuration)
        {
            _graphServiceClient = graphServiceClient;
            _configuration = configuration;
        }
    
        public async Task<string> CreateMeetingAsync()
        {
            var userId = _configuration.GetValue<string>("USER_ID");
            var newMeeting = await _graphServiceClient
                .Users[userId]
                .Calendar
                .Events
                .Request()
                .AddAsync(new()
                {
                    Subject = "Customer Service Meeting",
                    Start = new()
                    {
                        DateTime = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss"),
                        TimeZone = "UTC"
                    },
                    End = new()
                    {
                        DateTime = DateTime.UtcNow.AddHours(1).ToString("yyyy-MM-ddTHH:mm:ss"),
                        TimeZone = "UTC"
                    },
                    IsOnlineMeeting = true
                });
            return newMeeting.OnlineMeeting.JoinUrl;
        }
    }
    ```


7. Open `TeamsMeetingFunctions.cs` and take a moment to examine its constructor. It recieves `GraphServiceClient` specified in `Startup.cs` and sets it to the field property. `IConfiguration` is used to get the `USER_ID` set in `local.settings.json`.

    ```csharp
    private readonly IGraphService _graphService;
    
    public TeamsMeetingFunction(IGraphService graphService) => _graphService = graphService;
    ```

8. Explore the `Run` method:
    - It calls `CreateMeetingAsync` from `_graphService`, and creates a new event in the user's calendar. 
    - It returns the `JoinUrl` of the newly created event.

    ```csharp
    [FunctionName("TeamsMeetingFunction")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
        ILogger log) => 
        new OkObjectResult(await _graphService.CreateMeetingAsync());
    ```
    
10. Run the program by pressing `F5` in Visual Studio or by selecting `Debug --> Start Debugging` from the menu.

11. Now that the `TeamsMeetingFunction` is ready to use, let's call the function from the React app.

12. Open the `samples/acs-to-teams-meeting/client/react` folder in VS Code. Change the `.env` file with the following values:


```
REACT_APP_TEAMS_MEETING_FUNCTION=http://localhost:7071/api/TeamsMeetingFunction

REACT_APP_ACS_USER_FUNCTION=http://localhost:7071/api/ACSTokenFunction
```

:::info
These values will be passed into React as it builds so that you can easily change them as needed during the build process.
:::

13. Open `samples/acs-to-teams-meeting/client/react/App.tsx` file in VS Code.

14. Locate the `teamsMeetingLink` state variable in the component. Remove the hardcoded teams link and replace it with empty quotes:

    ```typescript
    const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>('');
    ```

15. Locate the `useEffect` function and change it to look like the following. This handles calling the Azure Function you looked at earlier which creates a Teams meeting and returns the meeting join link:

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
            let res = await fetch(process.env.REACT_APP_TEAMS_MEETING_FUNCTION as string); // Please add `let`.
            let link = await res.text();
            setTeamsMeetingLink(link);
            setMessage('');
            console.log('Teams meeting link', link);

        }
        init();

    }, []);
    ```

16. Save the file before continuing.

17. Open another terminal window, `cd` into the react folder, and run `npm start` to build and run the application.

18. After the application builds, you should see the ACS calling UI displayed and can then call into the Teams meeting that was dynamically created by Microsoft Graph.

19. Stop both of the terminal processes (React and Azure Functions) by entering `ctrl + c` in each terminal window.
