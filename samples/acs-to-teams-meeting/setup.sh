#!/bin/bash

# Create a shell variable named RESOURCE_GROUP
# and assign it the value of the resource group name to use
RESOURCE_GROUP="MyResourceGroup"

# create app registration and service principal
echo "Creating service principal..."
APP_ID=$(az ad sp create-for-rbac -n 'ACS Teams Interop App' --query "appId" --only-show-errors --output tsv)
APP_PASSWORD=$(az ad sp create-for-rbac -n 'ACS Teams Interop App' --query "password" --only-show-errors --output tsv)

# grant api permissions
echo "Granting Microsoft Graph permissions for service principal $appId" 
az ad app permission grant --id $APP_ID --api 00000003-0000-0000-c000-000000000000 --scope Calendars.ReadWrite > /dev/null 2>&1

# create acs instance
echo "Creating resource group named $RESOURCE_GROUP"
az group create --location westus --name $RESOURCE_GROUP > /dev/null 2>&1
echo "Creating ACS instance..."
az extension add --name communication > /dev/null 2>&1
UNIQUE_STRING=$(echo $RANDOM)
az communication create --name "acstoteams$UNIQUE_STRING" --location "Global" --data-location "United States" -g $RESOURCE_GROUP --only-show-errors

# # create serverless function
echo "Creating Azure Serverless function..."
az storage account create --name "acstoteams$UNIQUE_STRING" --location westus -g $RESOURCE_GROUP --sku Standard_LRS > /dev/null 2>&1
az appservice plan create -g $RESOURCE_GROUP -n "acstoteams$UNIQUE_STRING" -l westus
az functionapp create -g $RESOURCE_GROUP -p "acstoteams$UNIQUE_STRING" -n "acstoteams-function-app" -s "acstoteams$UNIQUE_STRING" --runtime node > /dev/null 2>&1

# output clientId, password
echo "\nCLIENT_ID: $APP_ID"
echo "CLIENT_SECRET: $APP_PASSWORD"
echo '\nAdd Calendar.ReadWrite permissions to configured permissions in the Azure Portal'
