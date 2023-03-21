net stop ipgusers
git pull
npm run build
net start ipgusers

# nssm install ipgusers "c:\Program Files\nodejs\node.exe" "C:\projects\ipg_scripter\dist\main"