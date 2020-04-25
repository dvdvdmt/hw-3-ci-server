const express = require('express');

const router = express.Router();

router.post('/build', (req, res) => {
  console.log('Starting build', req.body);
  res.sendStatus(200);
});

exports.agentRouter = router;
