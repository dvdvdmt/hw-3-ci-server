jest.mock('child_process');
const childProcess = require('child_process');
jest.mock('del');
const del = require('del');

const {gitApi} = require('./git-api.js');

describe('git API', () => {
  it('gets branch name', async () => {
    childProcess.execFile.mockImplementation((_file, _args, _options, cb) => {
      cb(undefined, {stdout: 'a0b84 crm-67-new-ticket-style'});
    });
    expect(await gitApi.getBranchName('a0b84')).toEqual('crm-67-new-ticket-style');
  });

  it('removes repository directory before clone', async () => {
    childProcess.execFile.mockImplementation((_file, _args, _options, cb) => {
      cb(undefined, {stdout: 'a0b84 crm-67-new-ticket-style'});
    });
    const repoDir = 'test-repo';
    gitApi.setup({repoDir});
    await gitApi.clone();
    expect(del).toBeCalledTimes(1);
    expect(del).toBeCalledWith(repoDir);
  });
});
