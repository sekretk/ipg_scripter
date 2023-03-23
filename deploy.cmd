echo on
FOR /F %%I IN ('git pull') DO @SET "MY_VAR=%%I"
echo %MY_VAR%
if /i "%MY_VAR%"=="Already" GOTO end

nssm stop ipg
REM nssm remove ipg confirm
git pull
call npm run build
REM nssm install ipg "c:\Program Files\nodejs\node.exe" "C:\projects\ipg_scripter\dist\main"
nssm start ipg

:end
echo END