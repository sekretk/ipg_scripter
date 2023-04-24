$userName = $args[0];



$sid = Get-ADUser $userName | Select-Object SID | Format-Table -HideTableHeaders | Out-String
$sid = $sid.Trim()
echo $sid
Remove-ADUser -Identity $sid -Confirm:$False

$sessionId = ((quser /server:IPG-TERM | Where-Object { $_ -match $userName }) -split ' +')[2]

if ([bool]$sessionId) {
Invoke-RDUserLogoff -HostServer IPG-TERM -UnifiedSessionId $sessionId -Force
}

$vhd = "D:\UVHD-" + $sid.Trim() + ".vhdx"

if (Test-Path -Path $vhd -PathType Leaf) {
    Remove-Item -Path $vhd  -Force 
}

