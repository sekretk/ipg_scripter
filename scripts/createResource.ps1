$folder = $args[0];
$group = $args[1];
New-ADGroup -Name $group -GroupScope Universal
New-Item -Path $folder -Type Directory
$AccessRule = New-Object System.Security.AccessControl.FileSystemAccessRule($group,"Modify", "ContainerInherit,ObjectInherit", "None", "Allow")
$acl = (Get-ACL -Path $folder)
$acl.SetAccessRuleProtection($True, $True)
$domainUsers = New-Object System.Security.Principal.Ntaccount("Domain Users")
$acl.PurgeAccessRules($domainUsers)
$acl.SetAccessRule($AccessRule)
Set-Acl -Path $folder -AclObject $acl