const path = require('path');
const {agentRegistry} = require('../agent-registry.js');
const {buildQueueApi} = require('../build-queue-api.js');
const {config} = require('../config.js');
const {settingsApi} = require('../settings-api.js');
const {GitApi} = require('./git-api.js');

let settings = {};
let gitApi;

async function initialize() {
  try {
    settings = await settingsApi.fetch();
  } catch (e) {
    if (e.response && e.response.status === 401) {
      console.log(
        '401 Unauthorized. Try to update auth token.',
        `Headers[www-authenticate]: ${e.response.headers['www-authenticate']}`
      );
    } else {
      console.log(e);
    }
    return;
  }
  if (!settings.repoName) {
    console.log('The repository name is empty. Initialization stopped.');
    return;
  }
  try {
    const repoUrl = `${config.repoHostUrl}/${settings.repoName}.git`;
    const repoDir = getRepoDir(config.reposRootDir, settings.repoName);
    gitApi = new GitApi(repoUrl, repoDir);
  } catch (e) {
    console.log(`Can't initialize git repository because of the following error`);
    console.log(e);
    return;
  }
  const isCloned = await gitApi.clone();
  if (isCloned) {
    console.log(`'${settings.repoName}' initialized`);
  } else {
    console.log('The repository does not exist or unavailable. Initialization stopped.');
  }
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
    let build = await buildQueueApi.getWaitingBuild();
    let agent = agentRegistry.getFreeAgent();
    while (build && agent) {
      await agent.runBuild({
        id: build.id,
        commitHash: build.commitHash,
        repoUrl: gitApi.repoUrl,
        buildCommand: settings.buildCommand,
      });
      await buildQueueApi.start(build.id);
      build = await buildQueueApi.getWaitingBuild();
      agent = agentRegistry.getFreeAgent();
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

function getRepoDir(reposRootDir, repoName) {
  const [_userName, ...rest] = repoName.split('/');
  const repoDir = rest.join('/');
  if (!repoDir) {
    throw new Error(`The repoName is invalid '${repoName}'. It has no user id prefix.`);
  }
  return path.join(reposRootDir, repoDir);
}

exports.repoManager = {
  initialize,
  scheduleBuild,
  processBuildQueue,
};

exports.getRepoDir = getRepoDir;
