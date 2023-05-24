 
Add-ADGroupMember -Identity "${parentGroup}" -Members ${group}

New-Item -Path $parentFolder -Type Directory

New-Item -Path $folder -Type Directory

$AccessRuleRE = New-Object System.Security.AccessControl.FileSystemAccessRule($parentGroup, "ReadAndExecute", "ContainerInherit,ObjectInherit", "None", "Allow")
$acl = (Get-ACL -Path $parentFolder)
$acl.SetAccessRule($AccessRuleRE)

$AccessRuleRE = New-Object System.Security.AccessControl.FileSystemAccessRule($parentGroup, "ListDirectory", "ContainerInherit,ObjectInherit", "None", "Allow")
$acl = (Get-ACL -Path $parentFolder)
$acl.SetAccessRule($AccessRuleRE)

Set-Acl -Path $parentFolder -AclObject $acl
$acl = (Get-ACL -Path $parentFolder)
$acl.SetAccessRuleProtection($True, $True)
Set-Acl -Path $parentFolder -AclObject $acl
$acl = (Get-ACL -Path $parentFolder)
$domainUsers = New-Object System.Security.Principal.Ntaccount("Domain Users")
$acl.PurgeAccessRules($domainUsers)
Set-Acl -Path $parentFolder -AclObject $acl

$AccessRule = New-Object System.Security.AccessControl.FileSystemAccessRule($group,"Modify", "ContainerInherit,ObjectInherit", "None", "Allow")
$acl = (Get-ACL -Path $folder)
$acl.SetAccessRule($AccessRule)
Set-Acl -Path $folder -AclObject $acl
$acl = (Get-ACL -Path $folder)
$acl.SetAccessRuleProtection($True, $True)
Set-Acl -Path $folder -AclObject $acl
$acl = (Get-ACL -Path $folder)
$domainUsers = New-Object System.Security.Principal.Ntaccount("Domain Users")
$acl.PurgeAccessRules($domainUsers)
Set-Acl -Path $folder -AclObject $acl 
