const { execSync } = require("child_process");
const fs = require('fs');

require('dotenv').config()

const curVersion = fs.readFileSync('../.version', 'utf8');
const currentHash = execSync('git rev-parse HEAD', { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 }).trim().replace('\n', '').replace('\r', '');
execSync('git pull');
 
const pulledVersion = fs.readFileSync('../.version', 'utf8');

if (pulledVersion === curVersion) {
    console.log('Version not changed. Deploy skipped')
    return;
}

const changeLog = execSync(`git log --oneline --pretty=format:%s ${currentHash}..HEAD`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 })
const changes = changeLog.split('\n').filter(msg => msg.startsWith('(d)')).map(item => item.substring(3).trim());


try {

execSync('deploy.cmd');


} catch (err) {
    console.error('Error on execution', err.toString())
}

const https = require('https');

const notifyMessage = `Новая версия '${pulledVersion}'.\nИзменения:\n${changes.join(';\n')}`

https.get(encodeURI(`${process.env.NOTIFY_URL}${notifyMessage}`), (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});