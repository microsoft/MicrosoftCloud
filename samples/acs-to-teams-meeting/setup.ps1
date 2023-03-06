#Requires -Modules Az, Az.Communication

# Create a shell variable named RESOURCE_GROUP
# and assign it the value of the resource group name to use
$RESOURCE_GROUP="MyResourceGroup"

# create app registration and service principal
Write-Output "Creating service principal..."
$sp = New-AzADServicePrincipal -DisplayName 'ACS-Teams-Interop-App'
Add-AzADAppPermission -ApplicationId $sp.AppId -ApiId 00000003-0000-0000-c000-000000000000 -PermissionId ef54d2bf-783f-4e0f-bca1-3210c0444d99 -Type Role
# User needs to grant consent via Azure Portal if the permission requires admin consent because Azure PowerShell doesn't support it yet.

Write-Output "Please grant admint consent via the Azure portal to $($sp.id) for the assigned Microsoft Graph permissions"

# create acs instance
Write-Output "Creating resource group named $RESOURCE_GROUP"
New-AzResourceGroup -Name $RESOURCE_GROUP -Location westus
$uniqueString = Get-Random
Write-Output "Creating ACS instance..."
New-AzCommunicationService -ResourceGroupName $RESOURCE_GROUP -Name "acstoteams${uniqueString}" -DataLocation UnitedStates -Location Global

# create serverless function
Write-Output "Creating Azure Serverless function..."
New-AzStorageAccount -ResourceGroupName $RESOURCE_GROUP -Name "acstoteams${uniqueString}"  -SkuName Standard_LRS -Location westus
New-AzAppServicePlan -ResourceGroupName $RESOURCE_GROUP -Name "acstoteams${uniqueString}" -Location westus
New-AzFunctionApp -ResourceGroupName $RESOURCE_GROUP -Name "acstoteams-function-app" -Location westus -Runtime Node -StorageAccountName "acstoteams${uniqueString}" 

# output app registration info
$return = [PSCustomObject]@{
    ClientId     = $sp.AppId
    ClientSecret = $sp.PasswordCredentials.SecretText
}

Write-Output $return

Write-Output "Please grant admint consent via the Azure portal to $($sp.id) for the assigned Microsoft Graph permissions. `
Go to https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps, select the ACS-Teams-Interop-App app, select API Permissions, and then grant admin consent to the Calendars.ReadWrite permission."
