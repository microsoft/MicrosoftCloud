---
title: 5. Deploy the App to Azure Static Web Apps
sidebar_position: 5
---

# Exercise 5

## Deploy the App to Azure Static Web Apps

In this exercise you'll learn how to deploy the ACS React app and the Azure Functions to the cloud using Azure Static Web Apps.

![Azure Static Web Apps](/img/acs-to-teams/5-deploy-swa.png "Azure Static Web Apps")

1. Visit https://portal.azure.com in your browser and sign in.

2. Type `static web apps` in the top search bar and select `Static Web Apps` from the options that appear.

    ![Azure Static Web Apps](/img/acs-to-teams/search-swa-portal.png "Azure Static Web Apps")

3. Select `Create` in the toolbar.

4. Perform the following tasks:
    - Select your subscription.
    - Select the resource group to use (create a new one if needed). You can use the same resource group that you used for ACS if you'd like.
    - Enter an Azure Static Web Apps name of `acs-to-teams-meeting`.
    - Select the `Free` plan type.
    - Select a region.

5. Select the GitHub radio button and sign in to your GitHub account.

6. After signing in, select your GitHub:
    - Organization
    - Repository (this will be the `MicrosoftCloud` repository you forked earlier in this tutorial)
    - Branch (select `main`)

7. In the `Build Details` section perform the following tasks:
    - Build Presets: `React`
    - App location: `/samples/acs-to-teams-meeting/client/react`
    - Api location: `/samples/acs-to-teams-meeting/server/csharp`
    - Output location: `build`

8. Select `Review + create`.

9. Review the details and select `Create`.

10. Notice the URL that is created for your static web app. Copy the URL shown on the Overview screen to a file. You'll need it later in this exercise.

11. Select `Settings --> Configuration` for your new static web app.

12. Add all of the following key/value pairs into the `Application settings` by selecting the `+ Add` button. Get the values from your `local.settings.json` in the `GraphACSFunctions` project in Visal Studio.

    ```
    # Get the values from your local.settings.json file
    TENANT_ID: <YOUR_VALUE>
    CLIENT_ID: <YOUR_VALUE>
    CLIENT_SECRET: <YOUR_VALUE>
    USER_ID: <YOUR_VALUE>
    ACS_CONNECTION_STRING: <YOUR_VALUE>
    ```

13. Select the `Save` button at the top of the Configuration screen in the Azure Portal.

14. Now that you've finished setting up the Azure Static Web App, go back to your GitHub repository (the one you forked earlier) and notice a `.yml` file has been added into the `.github/workflows` folder. 

15. Open the `.yml` file in VS Code and add the following YAML immediately after the `###### End of Repository/Build Configurations ######` comment. Replace the `<YOUR_AZURE_SWA_DOMAIN>` placeholders with your Azure Static Web Apps URL value. 

    > IMPORTANT: Ensure that the `env:` property is indented properly. It should match up with the indentation of the `with:` property above it.

    ```yaml
    env: # Add environment variables here
        REACT_APP_ACS_USER_FUNCTION: https://<YOUR_AZURE_SWA_DOMAIN>/api/ACSTokenFunction
        REACT_APP_TEAMS_MEETING_FUNCTION: https://<YOUR_AZURE_SWA_DOMAIN>/api/TeamsMeetingFunction
    ```

    :::info

    This will add environment variables into the build process for the React app so that it knows what APIs to call to get the ACS user token as well as to create a Teams meeting.

    :::

16. Save the `.yml` file and push the changes up to your GitHub repository. This will trigger a new build of the React application and then deploy it to your Azure Static Web App. 

17. Once the build process completes, visit the URL for your Azure Static Web App and you should see the application running.

18. You've successfully completed this tutorial!