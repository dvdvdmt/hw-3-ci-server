const express = require('express');
const ah = require('express-async-handler');
const {dbApi} = require('./db-api.js');

const router = express.Router();

router.get('/settings', ah(async (req, res) => {
  const {data} = await dbApi.get('/conf');
  let resJson = {};
  if (data.data) {
    const {repoName, buildCommand, mainBranch, period} = data.data;
    resJson = {repoName, buildCommand, mainBranch, period};
  }
  res.json(resJson);
}));

router.post('/settings', ah(async (req, res) => {
  const {data} = await dbApi.post('/conf', req.body);
  res.json(data);
}));

exports.apiRouter = router;
