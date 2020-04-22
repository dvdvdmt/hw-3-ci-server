require('dotenv').config();
const express = require('express');
const {serverApi} = require('./server-api.js');

serverApi.getAgentSettings().then(({data: settings}) => {
  const {port} = settings;
  const app = express();

  app.listen(port, async () => {
    console.log(`Build agent http://localhost:${port}`);
  });
});
