const {dbApi} = require('./db-api.js');

async function update(newSettings) {
  await dbApi.post('/conf', newSettings);
  return fetch();
}

async function fetch() {
  const {data} = await dbApi.get('/conf');
  let settings = {};
  const d = data.data;
  if (d) {
    settings = {
      repoName: d.repoName,
      buildCommand: d.buildCommand,
      mainBranch: d.mainBranch,
      period: d.period,
    };
  }
  return settings;
}

async function reset() {
  return dbApi.delete('/conf');
}

exports.settingsApi = {update, fetch, reset};
