const express = require('express');
const ah = require('express-async-handler');
const {buildQueueApi} = require('./build-queue-api.js');
const {initRepo} = require('./repo-manager');
const {scheduleBuild} = require('./repo-manager');
const {repoProcess} = require('./repo-manager');
const {settingsApi} = require('./settings-api.js');

const router = express.Router();

router.get(
  '/settings',
  ah(async (req, res) => {
    const settings = await settingsApi.fetch();
    res.json(settings);
  })
);

router.post(
  '/settings',
  ah(async (req, res) => {
    const settings = await settingsApi.update(req.body);
    repoProcess.send(initRepo());
    res.json(settings);
  })
);

router.delete(
  '/settings',
  ah(async (req, res) => {
    await settingsApi.reset();
    res.sendStatus(200);
  })
);

router.get(
  '/builds',
  ah(async (req, res) => {
    res.json(await buildQueueApi.getAll());
  })
);

router.post(
  '/builds/:commitHash',
  ah(async (req, res) => {
    const {commitHash} = req.params;
    repoProcess.send(scheduleBuild({commitHash}));
    res.sendStatus(200);
  })
);

router.get(
  '/builds/:buildId',
  ah(async (req, res) => {
    const {buildId} = req.params;
    res.json(await buildQueueApi.get(buildId));
  })
);

router.get(
  '/builds/:buildId/logs',
  ah(async (req, res) => {
    const {buildId} = req.params;
    res.json(await buildQueueApi.getBuildLog(buildId));
  })
);

exports.apiRouter = router;
