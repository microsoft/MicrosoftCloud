#!/bin/bash

# create app registration and service principal
echo "Creating service principal..."
appId=$(az ad sp create-for-rbac -n 'ACS Teams Interop App' --query "appId" --only-show-errors --output tsv)
password=$(az ad sp create-for-rbac -n 'ACS Teams Interop App' --query "password" --only-show-errors --output tsv)

# grant api permissions
echo "Granting Microsoft Graph permissions for service principal $appId" 
az ad app permission grant --id ${appId} --api 00000003-0000-0000-c000-000000000000 --scope Calendars.ReadWrite > /dev/null 2>&1

# create acs instance
echo "Creating ACS instnace..."
az group create --location westus --name MyResourceGroup > /dev/null 2>&1
az extension add --name communication > /dev/null 2>&1
uniqueString=$(echo $RANDOM)
az communication create --name "acstoteams${uniqueString}" --location "Global" --data-location "United States" --resource-group "MyResourceGroup" --only-show-errors

# create serverless function
echo "Creating Azure Serverless function..."
az storage account create --name "acstoteams${uniqueString}" --location westus --resource-group MyResourceGroup --sku Standard_LRS > /dev/null 2>&1
az appservice plan create -g MyResourceGroup -n MyPlan -l westus
az functionapp create -g MyResourceGroup -p MyPlan -n "acstoteams-function" -s "acstoteams${uniqueString}" --runtime node > /dev/null 2>&1

# output clientId, password
echo "\nCLIENT_ID: ${appId}"
echo "CLIENT_SECRET: ${password}"
echo '\nAdd Calendar.ReadWrite permissions to configured permissions in the Azure Portal'
