# Using OpenAI, Azure Communication Services, and Microsoft Graph/Microsoft Graph Toolkit to Build a Line of Business (LOB) Application

This application demonstrates how OpenAI, Azure Communication Services, and Microsoft Graph/Microsoft Graph Toolkit can be used in Line of Business (LOB) applications to improve the user experience, increase productivity, and take LOB apps to the next level.

- **AI**: Enable natural language to SQL queries using OpenAI to enable users to ask questions in natural language and get answers back in SQL. Automatically generate email and SMS messages using OpenAI completions.
- **Communication**: Enable in-app phone calling to customers and SMS functionality using Azure Communication Services.
- **Organizational Data**: Pull in related organizational data that users may need (documents, chats, emails, calendar events) as they work with customers to avoid context switching. Adding these features reduces the need for the user to switch to Outlook, Teams, OneDrive, other custom apps, their phone, etc. since the specific data and functionality they need is provided directly in the app.

[View the full tutorial](https://learn.microsoft.com/microsoft-cloud/dev/tutorials/openai-acs-msgraph) to learn how to build this application and the code that is used to enable the AI, Communication, and Organizational Data features.

## Prequisites

You'll need the following to run the full version of the sample:

- [Node](https://nodejs.org) - Node 16+ and npm 7+ will be used for this project
- [git](https://learn.microsoft.com/devops/develop/git/install-and-set-up-git?WT.mc_id=m365-94501-dwahlin)
- [Visual Studio Code](https://code.visualstudio.com?WT.mc_id=m365-94501-dwahlin) (while we'll reference Visual Studio Code in this tutorial, any editor can be used)
- [Azure subscription](https://azure.microsoft.com/free/search?WT.mc_id=m365-94501-dwahlin)
- [Microsoft 365 developer tenant](https://developer.microsoft.com/microsoft-365/dev-program?WT.mc_id=m365-94501-dwahlin)
- [Docker Desktop](https://www.docker.com/get-started/), [Podman](https://podman-desktop.io/downloads), [nerdctl](https://github.com/containerd/nerdctl) or another Open Container Initiative (OCI) compliant container runtime.


## Running the App

This application has 3 main features that can be individually enabled depending on what you'd like to use. The features include:

- **AI**: OpenAI Service. Used to enable natural language to SQL queries, email and SMS message generation, and "bring your own data" functionality.
- **Communication**: Azure Communication Services (ACS resource, phone number, and email domain). Used to enable in-app phone calling to customers and Email/SMS sending functionality.
- **Organizational Data**: Azure Active Directory, Microsoft Graph, Microsoft Graph Toolkit, and (optionally) Teams channels. Used to pull in related company documents, chats, emails, and calendar events and even send a message into a Teams channel.

Enable the features you'd like, ignore those you don't want, and the app will still run. You can [View the full tutorial](https://learn.microsoft.com/microsoft-cloud/dev/tutorials/openai-acs-msgraph?WT.mc_id=m365-94501-dwahlin) to learn how to build this application or go through the high-level summary that follows.

1. To start, rename the provided *.env.example* file to *.env* in the *tutorials/openai-msgraph-acs* folder. Note that it has the following values:

    ```
    AAD_CLIENT_ID=
    TEAM_ID=
    CHANNEL_ID=
    OPENAI_API_KEY=
    OPENAI_ENDPOINT=
    OPENAI_API_VERSION=2023-06-01-preview
    OPENAI_MODEL=gpt-35-turbo
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    ACS_CONNECTION_STRING=
    ACS_PHONE_NUMBER=
    ACS_EMAIL_ADDRESS=
    CUSTOMER_EMAIL_ADDRESS=
    CUSTOMER_PHONE_NUMBER=
    API_PORT=3000
    AZURE_COGNITIVE_SEARCH_ENDPOINT=
    AZURE_COGNITIVE_SEARCH_KEY=
    AZURE_COGNITIVE_SEARCH_INDEX=
    ```

1. Assign the following values to `POSTGRES_USER` and `POSTGRES_PASSWORD`.

    ```
    POSTGRES_USER=web
    POSTGRES_PASSWORD=web-password
    ```

## Enable the AI Feature (OpenAI Service)

1. If you'd like to try the natural language to SQL OpenAI functionality and email/SMS completions, add your [Azure OpenAI](https://learn.microsoft.com/azure/cognitive-services/openai/) key and endpoint into the `.env` file. You'll also need to create a model in your Azure OpenAI resource (such as a `gpt-35-turbo` model) and assign the model name to `OPENAI_MODEL` in the `.env` file.

    ```
    OPENAI_API_KEY=<AZURE_OPENAI_SECRET_KEY>
    OPENAI_ENDPOINT=<AZURE_OPENAI_ENDPOINT>
    OPENAI_MODEL=<AZURE_OPENAI_MODEL_NAME>
    ```

    Alternatively, you can use OpenAI instead by adding your [OpenAI](https://platform.openai.com/account/api-keys) secret key into the `.env` file and leaving the other associated OpenAI values blank.

    ```
    OPENAI_API_KEY=<OPENAI_SECRET_KEY>
    ```

1. If you'd like to enable the "bring your own data" feature, go through the [steps in this tutorial](https://learn.microsoft.com/azure/cognitive-services/openai/use-your-data-quickstart) and update the Cognitive Search properties in the `.env` file with your resource's endpoint, key, and index name.

    ```
    AZURE_COGNITIVE_SEARCH_ENDPOINT=
    AZURE_COGNITIVE_SEARCH_KEY=
    AZURE_COGNITIVE_SEARCH_INDEX=
    ```

## Enable the Communication Feature (Azure Communication Services)

1. Create an Azure Communication Services (ACS) resource in the [Azure Portal](https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Communication%2FCommunicationServices).

    - Add a toll-free phone number and ensure that the phone number has **calling and SMS capabilities enabled**. Copy the phone number value into a file for later use.

    - Create a connected email domain for your ACS resource:
    
        - Select `Connect your email domains` --> `Connect domain`. 
        - Select your `Subscription` and `Resource group`. 
        - Under the `Email Service` dropdown, select `Add an email service`.
        - Give the email service a name such as `acs-demo-email-service`.
        - Select `Review + create` followed by `Create`.
        - Once the deployment completes, select `Go to resource`, and select `1-click add` to add a free Azure subdomain.
        - After the subdomain is added (it'll take a few moments to be deployed), select it.
        - Once you're on the `AzureManagedDomain` screen, select `MailFrom addresses` from the sidebar menu. Copy the `MailFrom` value to a file. You'll use it later as you update the `.env` file.
        - Go back to your Azure Communication Services resource and select `Domains` from the left-hand menu.
        - Select `Add domain` and enter the `MailFrom` value from the previous step (ensure you select the correct subscription, resource group, and email service). Select the `Connect` button.

    - Update the following keys/values in the `.env` file. For the **CUSTOMER_PHONE_NUMBER**, you'll need to provide a United States based phone number (as of today) due to additional verification that is required in other countries for SMS. If you don't have one, you can leave it empty. For the **CUSTOMER_EMAIL_ADDRESS**, provide an email address you'd like email to be sent to from the app (since the customer data in the app's database is only sample data).

        ```
        ACS_CONNECTION_STRING=<ACS_CONNECTION_STRING>
        ACS_PHONE_NUMBER=<ACS_PHONE_NUMBER>
        ACS_EMAIL_ADDRESS=<ACS_EMAIL_ADDRESS>
        CUSTOMER_EMAIL_ADDRESS=<EMAIL_ADDRESS_TO_SEND_EMAIL_TO>
        CUSTOMER_PHONE_NUMBER=<UNITED_STATES_BASED_NUMBER_TO_SEND_SMS_TO>
        ```

        **NOTE**: You can get the ACS connection string from the Azure Portal by going to your ACS resource, selecting `Keys` from the left-hand menu, and copying the `connection string` value.

## Enable the Organizational Data Feature (Azure Active Directory and Microsoft Graph)

1. Create a [Microsoft 365 Developer tenant](https://developer.microsoft.com/en-us/microsoft-365/dev-program) if you don't already have one. 

1. Create a new Azure Active Directory (AAD) app registration using the [Azure Portal](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps).

    - Give the app a name such as `microsoft-graph-app`.
    - Select `Accounts in any organizational directory (Any Azure AD directory - Multitenant)`
    - Redirect URI: Single-page application (SPA) with a redirect URL of http://localhost:4200

1. After creating the app registration, go to the `Overview` screen and copy the `Application (client) ID` to your clipboard. Replace the <AAD_CLIENT_ID> value in the `.env` file with the value.

        ```
        AAD_CLIENT_ID=<AAD_CLIENT_ID>
        ```

1. To send a message from the app into a Teams Channel (optional feature that is included), open [Microsoft Teams](https://teams.microsoft.com) using your Microsoft 365 dev tenant account.

1. Expand a team and find a channel that you want to send messages to from the app.

1. In the team header, click on the three dots (...) and select `Get link to team`.

1. In the link that appears in the popup window, the team ID is the string of letters and numbers after `team/`. For example, in the link "https://teams.microsoft.com/l/team/19%3ae9b9.../", the team ID is *19%3ae9b9...* up to the following `/` character. 

1. Copy the team ID and assign it to `TEAM_ID` in the *.env* file.

1. In the channel header, click on the three dots (...) and select `Get link to channel`.

1. In the link that appears in the popup window, the channel ID is the string of letters and numbers after `channel/`. For example, in the link "https://teams.microsoft.com/l/channel/19%3aQK02.../", the channel ID is *19%3aQK02...* up to the following `/` character.

1. Copy the channel ID and assign it to `CHANNEL_ID` in the *.env* file.

## Install App Dependencies and Start the App

1. In the following steps you'll create three terminal windows in Visual Studio code.

1. Right-click in the Visual Studio Code file list and select **Open in Integrated Terminal**. 

1. Enter `docker-compose up` in the window and press <kbd>Enter</kbd> to start the Postgresql server.

1. Press the **+** icon in the **Terminal toolbar** to create a 2nd terminal window. `cd` into the *server/typescript* folder and run the following commands to install the dependencies and start the API server.

    - `npm install`
    - `npm start`

1. Press the **+** icon in the **Terminal toolbar** to create a 3rd terminal window. `cd` into the *client* folder and run the following commands to install the dependencies and start the client application.

    - `npm install`
    - `npm start` 

1. Go to the browser and login using your Microsoft 365 Developer tenant account. 

    **NOTE**: You'll have to add files, Teams chats, emails, calendar events, etc. that use the company names shown in the app such as "Adatum Corporation", "Adventure Works Cycles", "Contoso Pharmaceuticals", "Tailwind Traders" manually to see them pulled into the app. You won't see any Microsoft 365 organizational data results at all when you load the app otherwise - aside from the app's customers. [View the full tutorial](https://learn.microsoft.com/microsoft-cloud/dev/tutorials/openai-acs-msgraph) to learn more about doing this.
