const messages = require('./messages.js');
const {parentProcess} = require('./parent-process.js');

module.exports = {
  ...messages,
  repoProcess: parentProcess,
};
