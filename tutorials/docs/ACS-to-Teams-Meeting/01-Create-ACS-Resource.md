---
title: 1. Create an Azure Communication Services Resource
sidebar_position: 1
---

# Exercise 1

## Create an Azure Communication Services Resource

In this exercise you'll create an Azure Communication Services (ACS) resource in the Azure Portal.

![ACS in the Azure Portal](/img/acs-to-teams/1-acs-azure-portal.png "ACS in the Azure Portal")

To get started, perform the following tasks:

1. Visit https://portal.azure.com in your browser and sign in.

1. Type `communication services` in the top search bar and select `Communication Services` from the options that appear.

    ![ACS in the Azure Portal](/img/acs-to-teams/search-acs-portal.png "Azure Communication Services")

1. Select `Create` in the toolbar.

1. Perform the following tasks:
    - Select your Azure subscription.
    - Select the resource group to use (create a new one if one doesn't exist).
    - Enter an ACS resource name. It must be a unique value.
    - Select a data location.

1. Select `Review + Create` followed by `Create`.

1. Once your ACS resource is created, navigate to it, and select `Settings --> Identities & User Access Tokens`.

1. Select the `Voice and video calling (VOIP)` checkbox.

1. Select `Generate`.

1. Copy the `Identity` and `User Access token` values to a local file. You'll need the values later in this exercise.

    ![User identity and token](/img/acs-to-teams/user-identity-token.png "User identity and token")

1. Select `Settings --> Keys` and copy the `Primary key` connection string value to the local file where you copied the user identity and token values.

1. To run the application you'll need a Teams meeting link. Go to https://teams.microsoft.com, sign in with your Microsoft 365 developer tenant, and select the `Calendar` option on the left. 

    :::tip

    If you don't currently have a Microsoft 365 account, you can sign up for the [Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program) subscription. It's *free* for 90 days and will continually renew as long as you're using it for development activity. If you have a Visual Studio *Enterprise* or *Professional* subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits), active for the life of your Visual Studio subscription.

    :::

1. Select a any date/time on the calendar, add a title for the meeting, and select `Save`.

1. Select the new meeting you added in the calendar and copy the Teams meeting link that is displayed into the same file where you stored the ACS user identity, token, and connection string.

    ![Teams Meeting Join Link](/img/acs-to-teams/teams-meeting-link.png "Teams Meeting Join Link")

1. Now that your ACS resource is setup and you have a Teams meeting join link, let's get the React application up and running.