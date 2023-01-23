#Requires -Modules Az, Az.Communication

# create app registration and service principal
Write-Output "Creating service principal..."
$sp = New-AzADServicePrincipal -DisplayName 'ACS-Teams-Interop-App'
Add-AzADAppPermission -ApplicationId $sp.AppId -ApiId 00000003-0000-0000-c000-000000000000 -PermissionId ef54d2bf-783f-4e0f-bca1-3210c0444d99 -Type Role
# User needs to grant consent via Azure Portal if the permission requires admin consent because Azure PowerShell doesn't support it yet.

Write-Output "Please grant admint consent via the Azure portal to $($sp.id) for the assigned Microsoft Graph permissions"

# create acs instance
Write-Output "Creating ACS instnace..."
New-AzResourceGroup -Name MyResourceGroup -Location westus
$uniqueString = Get-Random
New-AzCommunicationService -ResourceGroupName MyResourceGroup -Name "acstoteams${uniqueString}" -DataLocation UnitedStates -Location Global

# create serverless function
Write-Output "Creating Azure Serverless function..."
New-AzStorageAccount -ResourceGroupName MyResourceGroup -Name "acstoteams${uniqueString}"  -SkuName Standard_LRS -Location westus
New-AzAppServicePlan -ResourceGroupName MyResourceGroup -Name acstoteams -Location westus
New-AzFunctionApp -ResourceGroupName MyResourceGroup -Name "acstoteams-function" -Location westus -Runtime Node -StorageAccountName "acstoteams${uniqueString}" 

# output app registration info
$return = [PSCustomObject]@{
    ClientId     = $sp.AppId
    ClientSecert = $sp.PasswordCredentials.SecretText
}

Write-Output $return
