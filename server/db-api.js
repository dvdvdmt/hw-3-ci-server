const axios = require('axios');

const dbApi = axios.create({
  baseURL: process.env.DB_URL,
  headers: {Authorization: `Bearer ${process.env.DB_TOKEN}`},
});

/**
 * @var {AxiosInstance}
 */
exports.dbApi = dbApi;
