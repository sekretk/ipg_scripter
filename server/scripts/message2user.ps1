$user = $args[0];
$msg = $args[1];

$session = Get-RDUserSession -ConnectionBroker "IPG-TERM.IPG.LOCAL" | Where-Object -Property UserName -EQ -Value "test" | Select UnifiedSessionId  -ExpandProperty UnifiedSessionId | ForEach-Object {Send-RDUserMessage -HostServer "IPG-TERM.IPG.LOCAL" -UnifiedSessionID $session -MessageTitle "Сообщение администратора" -MessageBody $_}