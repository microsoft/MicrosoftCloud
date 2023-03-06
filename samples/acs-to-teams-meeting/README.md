# Audio/Video Call from a Custom App into a Teams Meeting 

## Summary 

[View the Hands-On Tutorial](https://microsoft.github.io/MicrosoftCloud/tutorials/docs/ACS%20to%20Teams)

This scenario will teach you how to add audio/video calling functionality into a custom application. As users visit your app, they'll be able to make a call directly into a Microsoft Teams Meeting.

Use this type of functionality for:
- Customer service scenarios
- Doctor/patient scenarios
- Student/teacher scenarios
- Help desk scenarios
- More...

Technologies used in this scenario include:
- React
- Azure Communication Services
- Azure Functions
- Microsoft Graph
- Microsoft Teams

## Prerequisites

- [Node](https://nodejs.org)
- [Azure Functions Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
- [Azure subscription](https://azure.microsoft.com/free/search)
- [Microsoft 365 developer tenant](https://developer.microsoft.com/microsoft-365/dev-program)

## Setup Steps

To get the solution running you'll need to run the front-end and back-end solutions. You can alternatively go through our [hands-on tutorial](https://microsoft.github.io/MicrosoftCloud/tutorials/docs/ACS-to-Teams-Meeting) as well which will provide step-by-step instructions.

1. Follow the steps in the `acs-to-teams-meeting/server/[your-chosen-language]` readme (for example the `acs-to-teams-meeting/server/typescript`) to register an Azure Active Directory application and start the Azure Function.

1. Open the `acs-to-teams-meeting/client/react` folder in a terminal window.

1. Add the following environment variables by opening a command window and running the following commands. Choose the `Bash` or `Powershell` option based on your local setup.

#### Bash (Mac/Linux/WSL)

    ```bash
    export REACT_APP_ACS_USER_FUNCTION=http://localhost:7071/api/ACSTokenFunction
    export REACT_APP_TEAMS_MEETING_FUNCTION=http://localhost:7071/api/TeamsMeetingFunction
    ```

#### Powershell (Windows/Mac/Linux)

    ```powershell
    $Env:REACT_APP_ACS_USER_FUNCTION = "http://localhost:7071/api/ACSTokenFunction"
    $Env:REACT_APP_TEAMS_MEETING_FUNCTION = "http://localhost:7071/api/TeamsMeetingFunction"
    ```

1. Run `npm install`.

1. Run `npm start`.

    > NOTE: Ensure that you started the server project first as mentioned above.

## Solution

![ACS Audio/Video Solution](/tutorials/images/acs-to-teams-meeting/architecture.png "Scenario Architecture")

## References

- [Azure Communication Services](https://learn.microsoft.com/azure/communication-services)
- [Azure Functions](https://learn.microsoft.com/azure/azure-functions/functions-overview)
- [Microsoft Graph](https://learn.microsoft.com/graph/overview)
- [Microsoft Graph API for Microsoft Teams](https://learn.microsoft.com/graph/api/resources/teams-api-overview?view=graph-rest-1.0)


