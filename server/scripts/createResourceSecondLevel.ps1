$folder = $args[0];
$group = $args[1];
$parentGroup = $args[2];

New-ADGroup -Name $group -GroupScope Universal

Add-ADGroupMember -Identity "${parentGroup}" -Members ${group}

New-Item -Path $folder -Type Directory

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

$acl = (Get-ACL -Path $folder)
$accessrule = New-Object system.security.AccessControl.FileSystemAccessRule($parentGroup,"Read",,,"Allow")
$acl.RemoveAccessRuleAll($accessrule)
Set-Acl -AclObject $acl -Path $folder 
