import { AUX_SEPERATOR, MAIN_SEPERATOR } from './config';

export const COMMANDS = {
  GET_ALL_USER: `Get-ADUser -Filter * -Properties lastLogon | Select SamAccountName, DistinguishedName, Enabled, @{Name="lastLogon";Expression={[datetime]::FromFileTime($_.'lastLogon').toString("yyyy-MM-dd")}} |
  ForEach-Object { $_.SamAccountName + '${MAIN_SEPERATOR}' + $_.DistinguishedName + '${MAIN_SEPERATOR}' + $_.Enabled + '${MAIN_SEPERATOR}' + $_.lastLogon }`,
  GET_ALL_GROUPS: 'Get-ADGroup -Filter * | Format-Table Name',
  SNAPSHOT: `Get-ADUser -Filter * | Select-Object SamAccountName, DistinguishedName, Enabled, @{Name="groups"; Expression={ Get-ADPrincipalGroupMembership $_.SamAccountName | Join-String -Property name -Separator '${AUX_SEPERATOR}'}}, @{Name="lastLogon";Expression={[datetime]::FromFileTime($_.'lastLogon').toString("yyyy-MM-dd")}} | ForEach-Object { $_.SamAccountName + '${MAIN_SEPERATOR}' + $_.DistinguishedName + '${MAIN_SEPERATOR}' + $_.Enabled + '${MAIN_SEPERATOR}' + $_.lastLogon + '${MAIN_SEPERATOR}' + $_.groups }`,
};

export const getUserDetailsCommand = (user: string) =>
  `Get-ADUser -Filter "SamAccountName -eq '${user}'" -Properties lastLogon | Select SamAccountName, DistinguishedName, Enabled, @{Name="lastLogon";Expression={[datetime]::FromFileTime($_.'lastLogon').toString("yyyy-MM-dd")}} |
  ForEach-Object { $_.SamAccountName + '${MAIN_SEPERATOR}' + $_.DistinguishedName + '${MAIN_SEPERATOR}' + $_.Enabled + '${MAIN_SEPERATOR}' + $_.lastLogon }`;

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

export const createResource = (
  folder: string,
  scriptRoot: string,
  shareRoot: string,
  prefix: string,
) =>
  `${scriptRoot}createResource.ps1 "${shareRoot}${folder.toUpperCase()}" "${prefix}${folder.toUpperCase()}"`;

export const deleteUser = (user: string, root: string) =>
  `${root}removeUser.ps1 ${user}`;