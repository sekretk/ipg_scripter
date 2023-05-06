const { execSync } = require("child_process");
const fs = require('fs');

const curVersion = fs.readFileSync('.version', 'utf8');
execSync('git pull');

const pulledVersion = fs.readFileSync('.version', 'utf8');

if (pulledVersion === curVersion) {
    console.log('Version not changed. Deploy skipped')
    return;
}

execSync('cd client');
execSync('npm i');
execSync('npm run build');
execSync('cd ../server');
execSync('npm i');
execSync('npm run build');
execSync('cd ..');
execSync('cp -rf server/public server/dist/public');
execSync('cp -rf server/views server/dist/views');
execSync('cp -rf client/build/* server/dist/public/');
execSync('cp .env server/dist/.env');

const changeLog = execSync(`git log --oneline --pretty=format:%s ${curVersion}..HEAD`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 })
const changeSet = changeLog.split('\n').filter(msg => msg.startsWith('(d)'));

//send to slack