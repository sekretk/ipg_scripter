const { execSync } = require("child_process");
const fs = require('fs');

require('dotenv').config()

const curVersion = fs.readFileSync('.version', 'utf8');
execSync('git pull');
 
const pulledVersion = fs.readFileSync('.version', 'utf8');

if (pulledVersion === curVersion) {
    console.log('Version not changed. Deploy skipped')
    return;
}

const changeLog = execSync(`git log --oneline --pretty=format:%s ${curVersion}..HEAD`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 })
const changes = changeLog.split('\n').filter(msg => msg.startsWith('(d)')).map(item => item.substring(3));


try {

execSync('deploy.cmd');


} catch (err) {
    console.error('Error on execution', err.toString())
}

const https = require('https');

https.get(encodeURI(`${process.env.NOTIFY_URL}Новая версия '${pulledVersion}'. Изменения: ${changes.join(';')}`), (resp) => {
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