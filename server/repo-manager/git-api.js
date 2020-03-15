const childProcess = require('child_process');
const util = require('util');
const del = require('del');

const execFile = util.promisify(childProcess.execFile);
const exec = util.promisify(childProcess.exec);

let repoDir;
let reposRootDir;
let repoUrl;
let repoName;

function setup(settings) {
  repoDir = settings.repoDir;
  reposRootDir = settings.reposRootDir;
  repoUrl = settings.repoUrl;
  repoName = settings.repoName;
}

async function getCommitMessage(commitHash) {
  let res;
  try {
    const {stdout} = await execFile(
      'git',
      ['show', '--no-patch', `--pretty=format:%B`, commitHash],
      {
        cwd: repoDir,
      }
    );
    res = stdout;
  } catch (e) {
    console.error(`Error: ${e.cmd}`);
    return;
  }
  return res.trim();
}

async function getAuthorName(commitHash) {
  let res;
  try {
    const {stdout} = await execFile(
      'git',
      ['show', '--no-patch', `--pretty=format:%an`, commitHash],
      {
        cwd: repoDir,
      }
    );
    res = stdout;
  } catch (e) {
    console.error(`Error: ${e.cmd}`);
    return;
  }
  return res.trim();
}

async function getBranchName(commitHash) {
  let res;
  try {
    const {stdout} = await execFile('git', ['name-rev', commitHash], {
      cwd: repoDir,
    });
    res = stdout;
  } catch (e) {
    console.error(`Error: ${e.cmd}`);
    return;
  }
  return res.split(' ')[1];
}

async function clone() {
  try {
    console.log(`Removing '${repoName}'...`);
    await del(repoDir);
  } catch (e) {
    // It is fine if repo directory does not exists.
  }

  const {stdout, stderr} = await execFile('git', ['clone', repoUrl], {
    cwd: reposRootDir,
  });
  console.log(stdout || stderr);
}

async function execInRepo(command) {
  const {stdout} = await exec(command, {
    cwd: repoDir,
  });
  return stdout;
}

exports.gitApi = {
  getCommitMessage,
  getBranchName,
  getAuthorName,
  clone,
  setup,
  execInRepo,
};
