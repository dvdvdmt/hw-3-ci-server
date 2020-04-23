const axios = require('axios');
const {v4: uuid} = require('uuid');

const agentId = uuid();
const api = axios.create({
  baseURL: process.env.API_SERVER_URL,
  headers: {'X-Agent-Id': agentId},
});

function fetchAgentSettings() {
  return api.get('/notify-agent');
}

exports.serverApi = {
  fetchAgentSettings,
};
