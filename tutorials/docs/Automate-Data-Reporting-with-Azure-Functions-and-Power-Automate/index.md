# Automate Data Reporting with Azure Functions and Power Automate

**Level**: Intermediate

# Introduction

In this tutorial you'll learn how to migrate a local Node.js script to Azure Functions using Visual Studio Code so that data can be retrieved more easily for reporting purposes. To automate calling the API, you'll learn how to setup a Power Automate flow, call the Azure Function, and store the data in Excel Online.

Here's an overview of the application solution. Power Automate is used to setup a recurring action that calls out to Azure Functions, retrieves JSON data, parses it, extracts the desired values, and stores the data in Excel Online (note that many other storage options could be chosen).

![Power Automate and Azure Functions Flow](/img/automate-data-azure-functions-power-automate/scenario-overview.png "Power Automate and Azure Functions Flow")

### Pre-requisites
- [Node](https://nodejs.org) - Node LTS
- [git](https://learn.microsoft.com/devops/develop/git/install-and-set-up-git)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Azure Functions Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
- [Azure subscription](https://azure.microsoft.com/free/search)
- [Microsoft 365 developer tenant](https://developer.microsoft.com/microsoft-365/dev-program)

### Technologies used in this tutorial include
- Node.js
- Azure Functions
- GitHub
- Power Automate
- VS Code