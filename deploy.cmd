git pull
npm i
npm run build
@REM sc create IPGUSERS binpath= "C:\Program Files\nodejs\node.exe C:\projects\ipg_scripter\dist\main" start= auto depend= "Tcpip/Afd" DisplayName= "IPGUSERS"