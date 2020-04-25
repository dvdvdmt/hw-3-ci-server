require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const {agentRouter} = require('./agent-router.js');
const {serverApi} = require('./server-api.js');

serverApi
  .fetchAgentSettings()
  .then(({data: settings}) => {
    const {port} = settings;
    const app = express();
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(agentRouter);

    app.listen(port, async () => {
      console.log(`Build agent is listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(`Can't register build agent`);
    console.log(error);
  });
