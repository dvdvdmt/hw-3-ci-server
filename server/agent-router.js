const express = require('express');
const {agentRegistry} = require('./agent-registry.js');
const router = express.Router();

router.get('/notify-agent', (req, res) => {
  const agentId = req.get('X-Agent-Id');
  const {port} = agentRegistry.add(agentId);
  res.json({port});
});

exports.agentRouter = router;
