const express = require('express');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

app.use(express.static(publicDir));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, {swaggerUrl: '/openapi.yml'}));

app.listen(3000, () => {
  console.log("CI server is running at http://localhost:3000");
  console.log("Swagger UI available at http://localhost:3000/api-docs");
});
