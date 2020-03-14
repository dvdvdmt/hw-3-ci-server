require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const path = require('path');
const {errorHandler} = require('./error-handler.js');
const {apiRouter} = require('./api-router.js');

const app = express();

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(publicDir));
app.use('/api', apiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, {swaggerUrl: '/openapi.yml'}));
app.use(errorHandler);

app.listen(3000, () => {
  console.log("CI server is running at http://localhost:3000");
  console.log("Swagger UI available at http://localhost:3000/api-docs");
});
