const { exec } = require("child_process");
const fs = require('fs');

const curVersion = fs.readFileSync('.version', 'utf8');

exec('git pull');

