const express = require('express');
const {agentRegistry} = require('./agent-registry.js');
const {buildQueueApi} = require('./build-queue-api.js');
const router = express.Router();

router.get('/notify-agent', (req, res) => {
  const agentId = req.get('X-Agent-Id');
  const {port} = agentRegistry.add(agentId);
  res.json({port});
});

router.post('/notify-build-result', (req) => {
  const agentId = req.get('X-Agent-Id');
  const agent = agentRegistry.get(agentId);
  agent.setFree();
  const {buildId, status, log} = req.body;
  console.log(log);
  if (status) {
    buildQueueApi.success(buildId, log);
  } else {
    buildQueueApi.fail(buildId, log);
  }
});

exports.agentRouter = router;
