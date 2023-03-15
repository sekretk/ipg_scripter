export const GET_ALL_USER = 'Get-ADUser -Filter * | Format-Table Name, DistinguishedName -A';

export const GET_ALL_GROUPS = 'Get-ADGroup -Filter * | Format-Table Name';

export const GET_USER_GROUPS = 'Get-ADPrincipalGroupMembership test | Format-Table name';

export const ADD_USER_TO_GROUP = 'Add-ADGroupMember -Identity "IPG_Controller" -Members test';

export const REMOVE_USER_FROM_GROUP = `Remove-ADGroupMember -Identity "IPG_Buhgalteria"
-Members test -Confirm:$false`;