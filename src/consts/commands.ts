export const COMMANDS = {
  GET_ALL_USER:
    'Get-ADUser -Filter * | Format-Table SamAccountName, DistinguishedName, Enabled -A',

  GET_ALL_GROUPS: 'Get-ADGroup -Filter * | Format-Table Name',

  GET_USER_GROUPS: 'Get-ADPrincipalGroupMembership test | Format-Table name',

  ADD_USER_TO_GROUP:
    'Add-ADGroupMember -Identity "IPG_Controller" -Members test',

  REMOVE_USER_FROM_GROUP: `Remove-ADGroupMember -Identity "IPG_Buhgalteria"
    -Members test -Confirm:$false`,

  DISABLE_USER: 'Disable-ADAccount -Identity PattiFul',

  HELLO: 'hello',
};
