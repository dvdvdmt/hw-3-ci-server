jest.mock('child_process');
const childProcess = require('child_process');
jest.mock('del');
const del = require('del');

require('dotenv').config();
const {config} = require('../config.js');
const {GitApi} = require('./git-api.js');
const {getRepoDir} = require('./repo-manager.js');

const repoName = 'repo-name';
const repoFullName = `test/${repoName}`;
const repoUrl = `${config.repoHostUrl}/${repoFullName}.git`;
const repoDir = getRepoDir(config.reposRootDir, repoFullName);

describe('git API', () => {
  it('gets branch name', async () => {
    const gitApi = new GitApi(repoUrl, repoDir);
    childProcess.execFile.mockImplementation((_file, _args, _options, cb) => {
      cb(undefined, {stdout: 'a0b84 crm-67-new-ticket-style'});
    });
    expect(await gitApi.getBranchName('a0b84')).toEqual('crm-67-new-ticket-style');
  });

  it('removes repository directory before clone', async () => {
    const gitApi = new GitApi(repoUrl, repoDir);
    childProcess.execFile.mockImplementation((_file, _args, cb) => {
      cb(undefined, {stdout: 'a0b84 crm-67-new-ticket-style'});
    });
    await gitApi.clone();
    expect(del).toBeCalledTimes(1);
    expect(del).toBeCalledWith(expect.stringMatching(`${repoName}$`));
  });
});
