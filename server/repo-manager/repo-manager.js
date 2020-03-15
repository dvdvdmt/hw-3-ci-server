const util = require('util');
const childProcess = require('child_process');
const del = require('del');
const path = require('path');
const {config} = require('../config.js');
const {settingsApi} = require('../settings-api.js');
const {buildQueueApi} = require('../build-queue-api.js');

const execFile = util.promisify(childProcess.execFile);
const exec = util.promisify(childProcess.exec);
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
  console.log(`Run '${settings.buildCommand}' for '${commitHash}'`);
  const {stdout} = await exec(settings.buildCommand, {
    cwd: settings.repoDir,
  });
  console.log(stdout);
  return stdout;
}

async function getBranchName(commitHash) {
  let res;
  try {
    const {stdout} = await execFile(
      'git',
      ['branch', `--format='%(refname:short)'`, '--contains', commitHash],
      {
        cwd: settings.repoDir,
      }
    );
    res = stdout;
  } catch (e) {
    console.error(`Error: ${e.cmd}`);
    return;
  }
  return res.split('\n')[0];
}

async function getAuthorName(commitHash) {
  let res;
  try {
    const {stdout} = await execFile(
      'git',
      ['show', '--no-patch', `--pretty=format:%an`, commitHash],
      {
        cwd: settings.repoDir,
      }
    );
    res = stdout;
  } catch (e) {
    console.error(`Error: ${e.cmd}`);
    return;
  }
  return res.trim();
}

async function getCommitMessage(commitHash) {
  let res;
  try {
    const {stdout} = await execFile(
      'git',
      ['show', '--no-patch', `--pretty=format:%B`, commitHash],
      {
        cwd: settings.repoDir,
      }
    );
    res = stdout;
  } catch (e) {
    console.error(`Error: ${e.cmd}`);
    return;
  }
  return res.trim();
}

async function scheduleBuild(commitHash) {
  const branchName = await getBranchName(commitHash);
  if (!branchName) {
    console.log(`Can not schedule for commit '${commitHash}'. Its branch does not exist`);
    return;
  }
  const authorName = await getAuthorName(commitHash);
  const commitMessage = await getCommitMessage(commitHash);

  await buildQueueApi.push({
    commitMessage,
    commitHash,
    branchName,
    authorName,
  });
  processBuildQueue();
}

let isQueueInProcess = false;

async function processBuildQueue() {
  if (isQueueInProcess) {
    return;
  }
  isQueueInProcess = true;
  try {
    let build = await buildQueueApi.pop();
    while (build) {
      const startDate = new Date();
      await buildQueueApi.start(build.id, startDate);
      try {
        const buildLog = await runBuildCommand(build.commitHash);
        await buildQueueApi.success(build.id, buildLog, startDate);
      } catch (e) {
        console.log(e.stderr);
        await buildQueueApi.fail(build.id, e.stderr, startDate);
      }
      build = await buildQueueApi.pop();
    }
  } catch (e) {
    console.log(e.stack);
  } finally {
    isQueueInProcess = false;
  }
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

exports.repoManager = {
  initialize,
  scheduleBuild,
};
