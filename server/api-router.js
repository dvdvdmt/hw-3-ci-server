const express = require('express');
const ah = require('express-async-handler');
const {dbApi} = require('./db-api.js');

const router = express.Router();

router.get('/settings', ah(async (req, res) => {
  const {data} = await dbApi.get('/conf');
  let resJson = {};
  const d = data.data;
  if (d) {
    resJson = {
      repoName: d.repoName,
      buildCommand: d.buildCommand,
      mainBranch: d.mainBranch,
      period: d.period,
    };
  }
  res.json(resJson);
}));

router.post('/settings', ah(async (req, res) => {
  const {data} = await dbApi.post('/conf', req.body);
  res.json(data);
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
