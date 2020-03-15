const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const reposDir = path.resolve(rootDir, 'repos');

exports.config = {
  rootDir,
  publicDir,
  reposDir,
  repoHostUserUrl: `${process.env.REPO_HOST_URL}/${process.env.REPO_HOST_USER_ID}`,
};
