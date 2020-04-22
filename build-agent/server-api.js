const axios = require('axios');
const {uuidv4: uuid} = require('uuid');

const agentId = uuid();
const api = axios.create({
  baseURL: process.env.API_SERVER_URL,
  headers: {'X-Agent-Id': agentId},
});

function getAgentSettings() {
  return api.get('/notify-agent');
}

exports.serverApi = {
  getAgentSettings,
};
