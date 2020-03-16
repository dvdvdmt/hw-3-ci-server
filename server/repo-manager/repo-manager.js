const path = require('path');
const {config} = require('../config.js');
const {settingsApi} = require('../settings-api.js');
const {buildQueueApi} = require('../build-queue-api.js');
const {gitApi} = require('./git-api.js');

let settings = {};

async function initialize() {
  settings = await settingsApi.fetch();
  if (!settings.repoName) {
    console.log('The repository name is empty. Initialization stopped.');
    return;
  }
  gitApi.setup({
    repoDir: getRepoDir(settings.repoName),
    repoUrl: getRepoUrl(settings.repoName),
    reposRootDir: config.reposRootDir,
    repoName: settings.repoName,
  });
  const isCloned = await gitApi.clone(settings.repoUrl, config.reposRootDir);
  if (isCloned) {
    console.log(`'${settings.repoName}' initialized`);
  } else {
    console.log('The repository does not exist or unavailable. Initialization stopped.');
  }
}

async function runBuildCommand(commitHash) {
  console.log(`Run '${settings.buildCommand}' for '${commitHash}'`);
  const ans = await gitApi.execInRepo(settings.buildCommand);
  console.log(ans.result);
  return ans;
}

async function scheduleBuild(commitHash) {
  const isChecked = await gitApi.checkoutWithFetch(commitHash);
  if (!isChecked) {
    console.log(`Can not schedule build for commit '${commitHash}'. It does not exist.`);
    return;
  }
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
      const ans = await runBuildCommand(build.commitHash);
      if (ans.success) {
        await buildQueueApi.success(build.id, ans.result, startDate);
      } else {
        await buildQueueApi.fail(build.id, ans.result, startDate);
      }
      build = await buildQueueApi.pop();
    }
  } catch (e) {
    if (e.isAxiosError) {
      console.log(e.response.data);
    } else {
      console.log(e.stack);
    }
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
