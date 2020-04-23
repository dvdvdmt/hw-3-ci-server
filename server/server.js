require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const {agentRouter} = require('./agent-router.js');
const {apiRouter} = require('./api-router.js');
const {config} = require('./config.js');
const {errorHandler} = require('./error-handler.js');
const {repoManager} = require('./repo-manager/repo-manager.js');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(config.publicDir));
app.use(express.static(config.buildClientDir));
app.use('/api', apiRouter);
app.use(agentRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, {swaggerUrl: '/openapi.yml'}));
app.get('*', (req, res) => {
  res.sendFile(config.indexHtmlPath);
});
app.use(errorHandler);

app.listen(config.serverPort, async () => {
  console.log(`CI server is running at http://localhost:${config.serverPort}`);
  console.log(`Swagger UI available at http://localhost:${config.serverPort}/api-docs`);
  repoManager.initialize();
});
