const express = require('express');
const ah = require('express-async-handler');
const {dbApi} = require('./db-api.js');
const {settingsApi} = require('./settings-api.js');

const router = express.Router();

router.get('/settings', ah(async (req, res) => {
  const settings = await settingsApi.fetch();
  res.json(settings);
}));

router.post('/settings', ah(async (req, res) => {
  const settings = await settingsApi.update(req.body);
  res.json(settings);
}));

router.get('/builds', ah(async (req, res) => {
  const {data} = await dbApi.get('/build/list');
  let resJson = [];
  if (data.data && data.data.length) {
    resJson = data.data.map((el) => ({
      buildNumber: el.buildNumber,
      commitHash: el.commitHash,
      commitMessage: el.commitMessage,
      authorName: el.authorName,
      status: el.status,
      start: el.start,
      duration: el.duration,
    }));
  }
  res.json(resJson);
}));

exports.apiRouter = router;
