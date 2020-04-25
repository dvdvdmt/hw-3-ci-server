const {Agent} = require('./agent.js');
const {config} = require('./config.js');

class AgentRegistry {
  constructor(serverPort) {
    this.nextPort = serverPort + 1;
    this.agentMap = {};
  }

  add(agentId) {
    this.agentMap[agentId] = new Agent(agentId, this.nextPort++);
    return this.agentMap[agentId];
  }
}

exports.agentRegistry = new AgentRegistry(config.serverPort);
