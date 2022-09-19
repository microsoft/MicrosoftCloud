# Run Functions with Microsoft Graph

1. Create `local.settings.json` file in your code and add the following code snippet by updating the Event Hub connection string:
    ```json
   {
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "UseDevelopmentStorage=true",
        "FUNCTIONS_WORKER_RUNTIME": "node"
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

1. Register an app to Azure Active Directory to handle authentication for the deamon app: [Optional: configure app-only authentication](https://docs.microsoft.com/en-us/graph/tutorials/javascript?tabs=aad&tutorial-step=7)
    > In the App permissions tab, add `Calendars.ReadWrite` permission from Microsoft Graph Application Permissions. Grant admin consent for the permissions.

    > Update `Shared/graph.ts` file in the code with the required AAD app settings.

1. Run the following commands in your CLI to install the dependencies:
    ```
    npm install @azure/identity @microsoft/microsoft-graph-client isomorphic-fetch readline-sync
    ```

1. Open the terminal in Visual Studio Code and run your functions with the following command:
    ```
    func host start
    ```
    >Make sure that Microsoft Azure Storage Emulator is running in the background.

