$userName = $args[0];
$sid = Get-ADUser $userName | Select SID | Format-Table -HideTableHeaders | Out-String
$sessionId = ((quser /server:IPG-TERM | Where-Object { $_ -match $userName }) -split ' +')[2]

if ([bool]$sessionId) {
Invoke-RDUserLogoff -HostServer IPG-TERM -UnifiedSessionId $sessionId -Force
}

$vhd = "D:\UVHD-" + $sid.Trim() + ".vhdx"

if (Test-Path -Path $vhd -PathType Leaf) {
    Remove-Item -Path $vhd  -Force 
}

Remove-ADUser -Identity $userName -Confirm:$False