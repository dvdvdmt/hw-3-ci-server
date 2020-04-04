const {fork} = require('child_process');
const path = require('path');

exports.parentProcess = fork(path.join(__dirname, 'child-process.js'));
