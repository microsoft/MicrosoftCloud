#Requires -Modules Az, Az.Communication

$sp = New-AzADServicePrincipal -DisplayName 'ACS Teams Interop App 8'
Add-AzADAppPermission -ApplicationId $sp.AppId -ApiId 00000003-0000-0000-c000-000000000000 -PermissionId ef54d2bf-783f-4e0f-bca1-3210c0444d99 -Type Role
# User needs to grant consent via Azure Portal if the permission requires admin consent because Azure PowerShell doesn't support it yet.

# create acs instance
New-AzResourceGroup -Name MyResourceGroup -Location westus
$uniqueString = Get-Random
New-AzCommunicationService -ResourceGroupName MyResourceGroup -Name "acstoteams${uniqueString}" -DataLocation UnitedStates -Location Global

# create serverless function
New-AzStorageAccount -ResourceGroupName MyResourceGroup -Name "acstoteams${uniqueString}"  -SkuName Standard_LRS -Location westus
New-AzAppServicePlan -ResourceGroupName MyResourceGroup -Name acstoteams -Location westus
New-AzFunctionApp -ResourceGroupName MyResourceGroup -Name "acstoteams-function" -Location westus -Runtime Node -StorageAccountName "acstoteams${uniqueString}" 

# output app registration info
$return = [PSCustomObject]@{
    ClientId     = $sp.AppId
    ClientSecert = $sp.PasswordCredentials.SecretText
}

Write-Output $return
