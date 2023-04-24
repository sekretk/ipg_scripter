$accName = $args[0]; #"krn_begun"
$accFullName = $args[1]; #"Бегун Александр"
$accPass = $args[2]; #"1111111"
$target = $args[3]; #"CRM" | "KRN" | "MSK" | "PTG" | "RND" | "SPB" | "VLG"
New-ADUser -Name ($accFullName) -AccountPassword (ConvertTo-SecureString $accPass -AsPlainText -Force) -passThru -SamAccountName ($accName) -PasswordNeverExpires $True -Enabled $True
$targetOU = 'OU=' + ($target) + ',DC=IPG,DC=LOCAL'
Move-ADObject -Identity (Get-ADUser ($accName)) -TargetPath ($targetOU)