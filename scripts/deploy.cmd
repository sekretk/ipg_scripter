echo on
nssm stop ipg

cd ..\client\
call npm i
call npm run build
cd ..\server\
if not exist dist rmdir dist /Q /S
cd ..
if not exist .\server\public mkdir .\server\public
xcopy .\client\build .\server\public /E/H/C/I/Y
cd ..\server\
call npm i
call npm run build


cd ..

xcopy .\server\public .\server\dist\public /E/H/C/I/Y


if not exist .\server\dist\views mkdir .\server\dist\views
xcopy .\server\views .\server\dist\views /E/H/C/I/Y

xcopy ".env" "server\dist\" /Y
xcopy ".env" "scripts\" /Y

REM nssm remove ipg confirm
REM nssm install ipg "c:\Program Files\nodejs\node.exe" "c:\projects\ipg_scripter\server\dist\main.js"
nssm start ipg
