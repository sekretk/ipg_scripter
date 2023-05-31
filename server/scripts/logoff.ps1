$user = $args[0];

$session = Get-RDUserSession -ConnectionBroker "IPG-TERM.IPG.LOCAL" | Where-Object -Property UserName -EQ -Value "test" | Select UnifiedSessionId  -ExpandProperty UnifiedSessionId | ForEach-Object { Invoke-RDUserLogoff -HostServer IPG-TERM.IPG.LOCAL -UnifiedSessionID $_ -Force }