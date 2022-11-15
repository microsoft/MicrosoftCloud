---
title: 1. Install the Azure Functions Extension and Create a New Function
sidebar_position: 1
---

# Exercise 1

## Install the Azure Functions Extension for VS Code

In this exercise you'll create an empty project, install the Azure Functions extension for VS Code, and create a new function.

To get started, perform the following tasks:

1. Create an empty folder on your desktop and open it in VS Code.
1. Install the [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) if it's not already installed.
1. Click on the **Azure** icon in the VS Code sidebar.

    :::note
    If you don't see the Azure icon after installing the Azure Functions extension, right-click on the VS Code sidebar and select **Azure** from the menu.
    :::

1. Locate the **Workspace** section and click the **+** icon.
1. Select **Create Function** and then select **Yes**.

    ![Create Azure Function Dialog](/img/automate-data-azure-functions-power-automate/create-function-dialog.png "Create Azure Function Dialog")

1. Select the following:

    - **Language** : TypeScript
    - **Trigger** : HTTP trigger
    - **Function Name** : getGitHubRepoStats
    - **Authorization level** : Anonymous

    <br />

    :::note
    If you opened an existing project folder instead of an empty one, you may be prompted to overwrite the **.gitignore** and **package.json** files.
    :::

1. You will see the following folder and files added to your project:

    ![Create Azure Function Project Dialog](/img/automate-data-azure-functions-power-automate/azure-function-files.png "Create Azure Function Project Dialog")