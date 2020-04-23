const {config} = require('./config.js');

let nextAgentPort = config.serverPort + 1;
const agentMap = {};
function add(agentId) {
  agentMap[agentId] = {
    id: agentId,
    port: nextAgentPort++,
  };
  return agentMap[agentId];
}

module.exports.agentRegistry = {add};
