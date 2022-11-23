---
title: 3. Create and Deploy the Function App to Azure
sidebar_position: 3
---

# Exercise 3

## Create and Deploy the Function App to Azure

Now that the function is working locally, it's time to deploy it to Azure.

1. Open the VS Code command pallet (`shift + cmd + p` on Mac | `shift + ctrl + p` on Windows), and select **Azure Functions: Create Function App in Azure**.

    ![Create Function App in Azure](/img/automate-data-azure-functions-power-automate/create-function-app-in-azure.png "Create Function App in Azure")

1. You'll be prompted to enter the following information:

    - Your Azure subscription name.
    - The function name - enter `getGitHubRepoStats<YOUR_LAST_NAME>`
    
    :::note 
    A globally unique name is required. You can make the name more unique by adding a number or your last name to the end of the name.
    :::

    - The runtime stack - Select the latest `Node.js LTS` version.
    - The region (select any region you'd like).

1. Once the Azure Function App is created you’ll see a message about viewing the details. 

1. The next step is to deploy the code. Go back to the command pallet in VS Code and select **Azure Functions: Deploy to Function App**. You'll be asked to select your subscription and the Function App name you created earlier.

1. Once the function is deployed to Azure, do the following:

    - Select the Azure extension in VS Code (click the Azure icon in the sidebar).
    - Expand your subscription.
    - Expand your Function App.
    - Right-click on the function and select **Browse Website**. Ensure the function app is working correctly.
    - Add `/api/getGitHubRepoStats` to the URL and you should see data returned from your function.

1. Perform the following steps:

    - Copy the Azure Function domain to a local file. 
    - Copy the JSON data returned from the function call to a local file.

    You'll use these values in the next exercise.

