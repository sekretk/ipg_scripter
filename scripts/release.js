const { execSync } = require("child_process");
const fs = require('fs');

const curVersion = fs.readFileSync('.version', 'utf8');
execSync('git stash');

execSync('git checkout release');

execSync('git pull');

const nextVersion = Number(curVersion)++ ;

fs.writeFile('.version', nextVersion);

execSync('git add .version');
execSync(`git commit -m"Release ${nextVersion}"`);
execSync(`git push`);

execSync(`git tag ${nextVersion}`);
execSync(`git push orig ${nextVersion}`);

const changeLog = execSync(`git log --oneline --pretty=format:%s ${curVersion}..HEAD`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 })

const changeSet = changeLog.split('\n').filter(msg => msg.startsWith('(d)'));

console.log(`Released ${nextVersion} ${changeSet.join('\n')}`)

execSync('git stash pop');