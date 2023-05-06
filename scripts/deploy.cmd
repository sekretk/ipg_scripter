echo on
nssm stop ipg

cd ..\client\
call npm i
call npm run build
cd ..\server\
call npm i
call npm run build
cd ..
if not exist .\server\dist\public mkdir .\server\dist\public
xcopy .\server\public .\server\dist\public /E/H/C/I/Y
xcopy .\client\build .\server\dist\public /E/H/C/I/Y

if not exist .\server\dist\views mkdir .\server\dist\views
xcopy .\server\views .\server\dist\views /E/H/C/I/Y

xcopy ".env" "server\dist\" /Y
xcopy ".env" "scripts\" /Y

REM nssm remove ipg confirm
REM nssm install ipg "c:\Program Files\nodejs\node.exe" "c:\projects\ipg_scripter\server\dist\main.js"
nssm start ipg
