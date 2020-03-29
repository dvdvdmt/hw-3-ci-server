const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const buildClientDir = path.resolve(publicDir, 'build-client');
const indexHtmlPath = path.resolve(buildClientDir, 'index.html');
const reposRootDir = path.resolve(rootDir, 'repos');

exports.config = {
  rootDir,
  publicDir,
  buildClientDir,
  indexHtmlPath,
  reposRootDir,
  repoHostUserUrl: `${process.env.REPO_HOST_URL}/${process.env.REPO_HOST_USER_ID}`,
};
