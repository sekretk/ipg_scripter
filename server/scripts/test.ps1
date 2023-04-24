$sid = Get-ADUser krm_shipilov | Select SID | Format-Table -HideTableHeaders | Out-String
echo $sid
$userName = 'krm_shipilov'
$sessionId = ((quser /server:IPG-TERM | Where-Object { $_ -match $userName }) -split ' +')[2]

if ([bool]$sessionId) {

echo force logout from session $sessionId
Invoke-RDUserLogoff -HostServer IPG-TERM -UnifiedSessionId $sessionId -Force
}

$vhd = "D:\UVHD-" + $sid.Trim() + ".vhdx"

echo $vhd

Remove-Item -Path $vhd  -Force