const axios = require('axios');
const {config} = require('./config.js');

const api = axios.create({
  baseURL: process.env.API_SERVER_URL,
  headers: {'X-Agent-Id': config.agentId},
});

function fetchAgentSettings() {
  return api.get('/notify-agent');
}

function sendBuildResult({buildId, status, log}) {
  return api.post('/notify-build-result', {buildId, status, log});
}

exports.serverApi = {
  fetchAgentSettings,
  sendBuildResult,
};
