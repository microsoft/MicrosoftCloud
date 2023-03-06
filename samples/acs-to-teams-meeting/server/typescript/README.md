# Call Microsoft Graph and Azure Communication Services from Azure Functions

1. If you don't currently have an Office 365 account, you can sign up for a [Microsoft 365 Developer Program](https://cda.ms/1Jp) subscription. It's *free* for 90 days and will continually renew as long as you're using it for development activity. If you have a Visual Studio *Enterprise* or *Professional* subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits), active for the life of your Visual Studio subscription. *See* [Set up a Microsoft 365 developer subscription](https://cda.ms/1Jq).

You can choose from **one of the following options** to get started:
- Step 1A: Provision the Required Azure Resources Using an Automation Script
- Step 1B: Provision the Required Azure Resources Manually

Once you're done provisioning the Azure Resources, you can complete Step 2.

## Step 1A: Provision the Required Azure Resources Using an Automation Script

You'll need the Azure CLI installed to run the automation script. You can install the Azure CLI by following the [instructions here](https://docs.microsoft.com/cli/azure/install-azure-cli).

### Bash (Mac/Linux/WSL)

Go to the root of this project and run the following command to provision the required Azure Resources:

```bash
# 1. Ensure you're logged into the Azure CLI
az login

# 2. Open setup.sh and change the RESOURCE_GROUP shell variable located at the top of the file to the value you'd like to use.

# 3. Go to the samples/acs-to-teams-meeting folder in your command window.

# 4. Run the following script to provision the required Azure Resources
sh setup.sh
```

### Powershell (Windows/Mac/Linux)

Run the following command to provision the required Azure Resources:

```powershell
# 1. If you don't have the Azure PowerShell module and Azure Communication Services module installed, run the following commands to install them:

Install-Module -Name Az -AllowClobber -Scope CurrentUser
Install-Module -Name Az.Communication -AllowClobber -Scope CurrentUser

# 2. Ensure you're logged into the Azure CLI
Connect-AzAccount

# 3. Open setup.sh and change the RESOURCE_GROUP shell variable located at the top of the file to the value you'd like to use

# 4. Go to the samples/acs-to-teams-meeting folder in your command window.

# 5. Run the following script to provision the required Azure Resources
./setup.ps1
```

## Step 1B: Provision the Required Azure Resources Manually

1. [Register an app in the Azure Portal and configure app-only authentication](https://docs.microsoft.com/en-us/graph/tutorials/javascript?tabs=aad&tutorial-step=7).

1. In the App permissions tab, add the `Calendars.ReadWrite` permission from Microsoft Graph Application Permissions. Grant admin consent for the permissions.

    > You'll use the `Tenant Id`, `Client Id`, and `Client Secret` values later.

1. Go to `Users` in `Azure Active Directory` in the Azure Portal and select a user. You'll use the user's `Object ID` for the `<ACTIVE_DIRECTORY_USER_ID>` value in the next step.

1. Create an Azure Communication Services (ACS) resource using the [Azure Portal](https://portal.azure.com).

## Step 2: Configure Your Local Environment

1. Go to the `Settings --> Keys` section for your new Azure Communication Services resource and copy the first `connection string` value. You'll use it in the next step.

1. Create a `local.settings.json` file in the root of this folder and add the following code snippet. 

    ```json
   {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "UseDevelopmentStorage=true",
            "FUNCTIONS_WORKER_RUNTIME": "node",
            "TENANT_ID": "<YOUR_TENANT_ID>",
            "CLIENT_ID": "<YOUR_CLIENT_ID>",
            "CLIENT_SECRET": "<YOUR_CLIENT_SECRET>",
            "USER_ID": "<ACTIVE_DIRECTORY_USER_ID>",
            "ACS_CONNECTION_STRING": "<ACS_CONNECTION_STRING>"
        },
        "Host": {
            "LocalHttpPort": 7071,
            "CORS": "*",
            "CORSCredentials": false
        },
        "watchDirectories": [
            "Shared"
        ]
    }
    ```

1. Run the following command to install the required packages:
    ```
    npm install
    ```

1. Open the terminal in Visual Studio Code and run your functions with the following command:

    ```
    npm start
    ```

