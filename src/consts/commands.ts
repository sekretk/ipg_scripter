export const COMMANDS = {
  GET_ALL_USER: `Get-ADUser -Filter * -Properties lastLogon | Select SamAccountName, DistinguishedName, Enabled,  @{Name="lastLogon";Expression={[datetime]::FromFileTime($_.'lastLogon').toString("yyyy-MM-dd")}}`,

  GET_ALL_GROUPS: 'Get-ADGroup -Filter * | Format-Table Name',

  ADD_USER_TO_GROUP:
    'Add-ADGroupMember -Identity "IPG_Controller" -Members test',

  REMOVE_USER_FROM_GROUP: `Remove-ADGroupMember -Identity "IPG_Buhgalteria"
    -Members test -Confirm:$false`,

  DISABLE_USER: 'Disable-ADAccount -Identity PattiFul',

  HELLO: 'hello',
};

export const getUserDetailsCommand = (user: string) =>
  `Get-ADUser -Filter "SamAccountName -eq '${user}'" -Properties lastLogon | Select SamAccountName, DistinguishedName, Enabled,  @{Name="lastLogon";Expression={[datetime]::FromFileTime($_.'lastLogon').toString("yyyy-MM-dd")}}`;

export const getUserGroups = (user: string) =>
  `Get-ADPrincipalGroupMembership ${user} | Format-Table name`;
