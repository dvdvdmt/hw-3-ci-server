const path = require('path');
const {v4: uuid} = require('uuid');

const agentId = uuid();
const rootDir = path.resolve(__dirname, '..');
const reposRootDir = path.resolve(rootDir, 'repos');
const repoDir = path.resolve(reposRootDir, agentId);

exports.config = {
  agentId,
  repoDir,
};
