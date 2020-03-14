const util = require('util');
const childProcess = require('child_process');
const del = require('del');
const path = require('path');
const {config} = require('./config.js');
const {settingsApi} = require('./settings-api.js');

const execFile = util.promisify(childProcess.execFile);

async function initialize() {
  const {repoName} = await settingsApi.fetch();
  if (!repoName) {
    return;
  }
  await initRepo(repoName);
}

async function initRepo(repoName) {
  await deleteLocalRepo(repoName);
  await cloneRepo(getRepoUrl(repoName));
}

async function deleteLocalRepo(repoName) {
  const repoDir = getRepoDir(repoName);
  try {
    console.log(`Removing '${repoDir}'...`);
    await del(repoDir);
  } catch (e) {
    // It is fine if repo directory does not exists.
  }
}

async function cloneRepo(repoUrl) {
  const {stdout, stderr} = await execFile('git', ['clone', repoUrl], {cwd: config.reposDir});
  console.log(stdout || stderr);
}

function getRepoDir(repoName) {
  return path.join(config.reposDir, repoName);
}

function getRepoUrl(repoName) {
  return `${config.repoHostUserUrl}/${repoName}.git`;
}

exports.repoManager = {initialize};
