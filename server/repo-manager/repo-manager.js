const path = require('path');
const {config} = require('../config.js');
const {settingsApi} = require('../settings-api.js');
const {buildQueueApi} = require('../build-queue-api.js');
const {gitApi} = require('./git-api.js');

let settings = {};

async function initialize() {
  settings = await settingsApi.fetch();
  if (!settings.repoName) {
    console.log('Repo name is empty. Initialization stopped.');
    return;
  }
  gitApi.setup({
    repoDir: getRepoDir(settings.repoName),
    repoUrl: getRepoUrl(settings.repoName),
    reposRootDir: config.reposRootDir,
    repoName: settings.repoName,
  });
  await initRepo();
}

async function initRepo() {
  await gitApi.clone(settings.repoUrl, config.reposRootDir);
  console.log(`'${settings.repoName}' initialized`);
}

async function runBuildCommand(commitHash) {
  console.log(`Run '${settings.buildCommand}' for '${commitHash}'`);
  const out = await gitApi.execInRepo(settings.buildCommand);
  console.log(out);
  return out;
}

async function scheduleBuild(commitHash) {
  const branchName = await gitApi.getBranchName(commitHash);
  if (!branchName) {
    console.log(`Can not schedule build for commit '${commitHash}'. Its branch does not exist.`);
    return;
  }
  const authorName = await gitApi.getAuthorName(commitHash);
  const commitMessage = await gitApi.getCommitMessage(commitHash);

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
