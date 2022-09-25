# Using Azure Communication Services to Call into a Teams Meeting

1. You'll need an Azure Communication Services resource setup to run this demonstration. Visit https://learn.microsoft.com/azure/communication-services/quickstarts/create-communication-resource for instructions.

1. Go to your ACS resource in the Azure Portal:
    - Select `Identifies & User Access Tokens` from the `Settings` section.
    - Select the `Voice and video calling (VOIP)` checkbox.
    - Copy the `Identity` and `User Access token` values (you'll use them in the next step).

1. Add a `.env` file into this folder with the following values:

    ```
    REACT_APP_ACS_USER_ID=<YOUR_ACS_IDENTITY_VALUE>
    REACT_APP_ACS_TOKEN=<YOUR_ACS_TOKEN_VALUE>
    REACT_APP_FUNCTION_URL=http://localhost:7071/api/TeamsMeetingFunction
    ```

1. Run `npm install` in this project.

1. Follow the steps in the `server/[your-chosen-language]` project to register an Azure Active Directory application and start the Azure Function.

1. Run `npm start` in this project.