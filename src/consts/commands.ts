export const COMMANDS = {
  GET_ALL_USER: `Get-ADUser -Filter * -Properties lastLogon | Select SamAccountName, DistinguishedName, Enabled, @{Name="lastLogon";Expression={[datetime]::FromFileTime($_.'lastLogon').toString("yyyy-MM-dd")}} |
  ForEach-Object { $_.SamAccountName + ';' + $_.DistinguishedName + ';' + $_.Enabled + ';' + $_.lastLogon }`,

  GET_ALL_GROUPS: 'Get-ADGroup -Filter * | Format-Table Name',
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
