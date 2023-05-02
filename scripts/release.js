const { execSync } = require("child_process");
const fs = require('fs');

try {
const curVersion = fs.readFileSync('.version', 'utf8');
execSync('git stash');

execSync('git checkout release');

execSync('git merge develop');
console.log(Number(curVersion))
const nextVersion = Number(curVersion) + 1;

fs.writeFileSync('.version', nextVersion.toString(), { encoding: 'utf8' });

execSync('git add .version');
execSync(`git commit -m"Release ${nextVersion}"`);
execSync(`git push`);

execSync(`git tag ${nextVersion}`);
execSync(`git push origin ${nextVersion}`);

const changeLog = execSync(`git log --oneline --pretty=format:%s ${curVersion}..HEAD`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 })

console.log('XXX ', changeLog)

const changeSet = changeLog.split('\n').filter(msg => msg.startsWith('(d)')).map(msg => msg.substring(2));

console.log(`Released ${nextVersion} ${changeSet.join('\n')}`)

execSync('git switch -');
execSync('git stash pop');
} catch (err) {
    console.log(`Error on release ${err.toString()}`)
}
