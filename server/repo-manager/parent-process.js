const path = require('path');
const {fork} = require('child_process');

exports.parentProcess = fork(path.join(__dirname, 'child-process.js'));
