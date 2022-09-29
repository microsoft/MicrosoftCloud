# Audio/Video Call from a Custom App into a Teams Meeting 

## Summary 

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

To get the solution going you'll need to run the front-end and back-end solutions. 

1. Follow the steps in the `server/typescript` [README](./server/typescript/README.md) file to get the server setup and started.
1. Follow the steps in the `client` [README](./client/react/README.md) file to get the client setup and started.

## Solution

![ACS Audio/Video Solution](./architecture.png "Scenario Architecture")

## References

- [Azure Communication Services](https://learn.microsoft.com/azure/communication-services)
- [Azure Functions](https://learn.microsoft.com/azure/azure-functions/functions-overview)
- [Microsoft Graph](https://learn.microsoft.com/graph/overview)
- [Microsoft Graph API for Microsoft Teams](https://learn.microsoft.com/graph/api/resources/teams-api-overview?view=graph-rest-1.0)

## Next Step

