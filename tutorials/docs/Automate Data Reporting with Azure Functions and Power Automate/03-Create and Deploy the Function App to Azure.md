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
    - The function name.
    - The runtime stack (select Node.js 16 LTS).
    - The region (select any region you'd like).

1. Once the Azure Function App is created you’ll see a message about viewing the details. 

1. The next step is to deploy the code. Go back to the command pallet in VS Code and select **Azure Functions: Deploy to Function App**. You’ll be asked to select your subscription and Function App name.

1. Once the function is deployed to Azure, you can go to the Azure extension in VS Code (click the Azure icon in the sidebar), expand your subscription, expand your Function App, right-click on the function and select **Browse Website**. Add `/api/<your\_function\_app\_name>` to the URL and you should see data returned from your function.

