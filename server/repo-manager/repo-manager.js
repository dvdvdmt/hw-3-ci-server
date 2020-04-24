const {buildQueueApi} = require('../build-queue-api.js');
const {config} = require('../config.js');
const {settingsApi} = require('../settings-api.js');
const {GitApi} = require('./git-api.js');

let settings = {};

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
  let gitApi;
  try {
    gitApi = new GitApi(settings.repoName, config.repoHostUrl, config.reposRootDir);
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

exports.repoManager = {
  initialize,
  scheduleBuild,
};
