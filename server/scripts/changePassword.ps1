$userName = $args[0];
$password = $args[1];

$sid = Get-ADUser $userName | Select-Object SID | Format-Table -HideTableHeaders | Out-String
$sid = $sid.Trim()
Set-ADAccountPassword -Identity $sid -Reset -NewPassword (ConvertTo-SecureString -AsPlainText $password -Force) 
