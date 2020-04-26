const axios = require('axios');

class Agent {
  constructor(id, port) {
    this.id = id;
    this.port = port;
    this.api = axios.create({baseURL: `http://localhost:${port}`});
    this.processingBuildId = null;
  }

  async runBuild({id, repoUrl, commitHash, buildCommand}) {
    await this.api.post(`/build`, {buildId: id, repoUrl, commitHash, buildCommand});
    this.processingBuildId = id;
  }

  setFree() {
    this.processingBuildId = null;
  }
}

exports.Agent = Agent;
