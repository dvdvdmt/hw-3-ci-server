const express = require('express');
const {GitApi} = require('../server/repo-manager/git-api.js');
const {config} = require('./config.js');
const {serverApi} = require('./server-api.js');

const router = express.Router();

router.post('/build', (req, res) => {
  console.log('Starting build', req.body);
  const {buildId, repoUrl, commitHash, buildCommand} = req.body;
  if (buildId && repoUrl && commitHash && buildCommand) {
    res.sendStatus(200);
    runBuild(req.body);
  } else {
    res.status(400).json({
      message: `Some of the required params are empty: ${JSON.stringify(req.body, null, 2)}`,
    });
  }
});

async function runBuild({buildId, repoUrl, commitHash, buildCommand}) {
  const gitApi = new GitApi(repoUrl, config.repoDir);
  const isCloned = await gitApi.clone();
  if (!isCloned) {
    serverApi.sendBuildResult({
      buildId,
      status: false,
      log: `Can't clone repository ${repoUrl} to ${config.repoDir}`,
    });
    return;
  }
  const isCheckedOut = await gitApi.checkout(commitHash);
  if (!isCheckedOut) {
    serverApi.sendBuildResult({
      buildId,
      status: false,
      log: `Can't checkout commit hash ${commitHash}`,
    });
    return;
  }
  const startDate = new Date().toISOString();
  const execResult = await gitApi.execInRepo(buildCommand);
  const endDate = new Date().toISOString();
  if (execResult.success) {
    serverApi.sendBuildResult({
      buildId,
      status: true,
      startDate,
      endDate,
      log: execResult.result,
    });
  } else {
    serverApi.sendBuildResult({
      buildId,
      status: false,
      startDate,
      endDate,
      log: execResult.result,
    });
  }
}

exports.agentRouter = router;
