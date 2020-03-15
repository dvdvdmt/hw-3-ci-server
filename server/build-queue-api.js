const differenceInSeconds = require('date-fns/differenceInSeconds');
const {dbApi} = require('./db-api.js');

async function getAll() {
  const {data} = await dbApi.get('/build/list');
  let resJson = [];
  if (data.data && data.data.length) {
    resJson = data.data.map((el) => ({
      id: el.id,
      buildNumber: el.buildNumber,
      commitHash: el.commitHash,
      commitMessage: el.commitMessage,
      authorName: el.authorName,
      status: el.status,
      start: el.start,
      duration: el.duration,
    }));
  }
  return resJson;
}

async function push(build) {
  await dbApi.post('/build/request', build);
}

async function pop() {
  const builds = await getAll();
  const firstWaitingBuild = builds.find(({status}) => status === 'Waiting');
  return firstWaitingBuild;
}

async function start(buildId, startDate) {
  await dbApi.post('/build/start', {buildId, dateTime: startDate.toISOString()});
}

async function fail(buildId, buildLog, startDate) {
  const failDate = new Date();
  await dbApi.post('/build/finish', {
    buildId,
    success: false,
    duration: differenceInSeconds(failDate, startDate),
    buildLog,
  });
}

async function success(buildId, buildLog, startDate) {
  const failDate = new Date();
  await dbApi.post('/build/finish', {
    buildId,
    success: true,
    duration: differenceInSeconds(failDate, startDate),
    buildLog,
  });
}

async function get(buildId) {
  const {data} = await dbApi.get('/build/details', {params: {buildId}});
  return data.data;
}

async function getBuildLog(buildId) {
  const {data} = await dbApi.get('/build/log', {params: {buildId}});
  return data;
}

exports.buildQueueApi = {
  push,
  pop,
  getAll,
  get,
  getBuildLog,
  start,
  fail,
  success,
};
