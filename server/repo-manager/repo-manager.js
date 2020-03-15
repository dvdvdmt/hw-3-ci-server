const util = require('util');
const childProcess = require('child_process');
const del = require('del');
const path = require('path');
const {config} = require('../config.js');
const {settingsApi} = require('../settings-api.js');

const execFile = util.promisify(childProcess.execFile);
let settings = {};

async function initialize() {
  settings = await settingsApi.fetch();
  if (!settings.repoName) {
    console.log('Repo name is empty. Initialization stopped.');
    return;
  }
  settings.repoDir = getRepoDir(settings.repoName);
  settings.repoUrl = getRepoUrl(settings.repoName);
  await initRepo();
}

async function initRepo() {
  await deleteLocalRepo();
  await cloneRepo();
  console.log(`'${settings.repoName}' initialized`);
}

async function deleteLocalRepo() {
  try {
    console.log(`Removing '${settings.repoDir}'...`);
    await del(settings.repoDir);
  } catch (e) {
    // It is fine if repo directory does not exists.
  }
}

async function runBuildCommand(commitHash) {
  console.log(`Run ${settings.buildCommand} for '${commitHash}'`);
  const {stdout, stderr} = await execFile('git', ['log', '--oneline'], {
    cwd: settings.repoDir,
  });
  console.log(stdout || stderr);
}

async function cloneRepo() {
  const {stdout, stderr} = await execFile('git', ['clone', settings.repoUrl], {
    cwd: config.reposRootDir,
  });
  console.log(stdout || stderr);
}

function getRepoDir(repoName) {
  return path.join(config.reposRootDir, repoName);
}

function getRepoUrl(repoName) {
  return `${config.repoHostUserUrl}/${repoName}.git`;
}

exports.repoManager = {initialize, runBuildCommand};
