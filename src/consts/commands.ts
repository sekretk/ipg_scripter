import { PREFIX, SHARE_ROOT } from './config';

export const COMMANDS = {
  GET_ALL_USER: `Get-ADUser -Filter * -Properties lastLogon | Select SamAccountName, DistinguishedName, Enabled, @{Name="lastLogon";Expression={[datetime]::FromFileTime($_.'lastLogon').toString("yyyy-MM-dd")}} |
  ForEach-Object { $_.SamAccountName + ';' + $_.DistinguishedName + ';' + $_.Enabled + ';' + $_.lastLogon }`,
  GET_ALL_GROUPS: 'Get-ADGroup -Filter * | Format-Table Name',
  SNAPSHOT: `Get-ADUser -Filter * | Select-Object SamAccountName, DistinguishedName, Enabled, @{Name="groups"; Expression={ Get-ADPrincipalGroupMembership $_.SamAccountName | Join-String -Property name -Separator ';'}}, @{Name="lastLogon";Expression={[datetime]::FromFileTime($_.'lastLogon').toString("yyyy-MM-dd")}} | ForEach-Object { $_.SamAccountName + '|' + $_.DistinguishedName + '|' + $_.Enabled + '|' + $_.lastLogon + '|' + $_.groups }`,
};

export const getUserDetailsCommand = (user: string) =>
  `Get-ADUser -Filter "SamAccountName -eq '${user}'" -Properties lastLogon | Select SamAccountName, DistinguishedName, Enabled, @{Name="lastLogon";Expression={[datetime]::FromFileTime($_.'lastLogon').toString("yyyy-MM-dd")}} |
  ForEach-Object { $_.SamAccountName + ';' + $_.DistinguishedName + ';' + $_.Enabled + ';' + $_.lastLogon }`;

export const getUserGroups = (user: string) =>
  `Get-ADPrincipalGroupMembership ${user} | Format-Table name`;

export const activateUser = (user: string) =>
  `Enable-ADAccount -Identity ${user}`;

export const deactivateUser = (user: string) =>
  `Disable-ADAccount -Identity ${user}`;

export const moveUserToGroup = (user: string, group: string) =>
  `Add-ADGroupMember -Identity "${group}" -Members ${user}`;

export const removeUserFromGroup = (user: string, group: string) =>
  `Remove-ADGroupMember -Identity "${group}" -Members ${user} -Confirm:$false`;

export const CREATE_FOLDER = (folder: string) =>
  `New-item -Path "${SHARE_ROOT}${folder.toUpperCase()}" -ItemType Directory`;

export const CREATE_GROUP = (group: string) =>
  `New-ADGroup -Name ${PREFIX}${group.toUpperCase()} -GroupScope Universal`;

//remove inheritance

/**
  "$AccessRule = New-Object System.Security.AccessControl.FileSystemAccessRule('IPG_TEST','Modify', 'ContainerInherit,ObjectInherit', 'None', 'Allow'); $acl = (Get-ACL -Path 'E:\SHARE\TEST'); $acl.SetAccessRuleProtection($True, $True); $domainUsers = New-Object System.Security.Principal.Ntaccount('Domain Users'); $acl.PurgeAccessRules($domainUsers); $acl.SetAccessRule($AccessRule); $Acl | Set-Acl -Path 'E:\SHARE\TEST'"
  
   */
