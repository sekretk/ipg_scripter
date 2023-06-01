$user = $args[0];
$msg = $args[1];

Get-RDUserSession -ConnectionBroker "IPG-TERM.IPG.LOCAL" | Where-Object -Property UserName -EQ -Value testovich | Select UnifiedSessionId  -ExpandProperty UnifiedSessionId | ForEach-Object {Send-RDUserMessage -HostServer "IPG-TERM.IPG.LOCAL" -UnifiedSessionID $_ -MessageTitle "Сообщение администратора" -MessageBody $msg}