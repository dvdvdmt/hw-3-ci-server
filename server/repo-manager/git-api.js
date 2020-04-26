const childProcess = require('child_process');
const path = require('path');
const util = require('util');
const del = require('del');

const execFile = util.promisify(childProcess.execFile);
const exec = util.promisify(childProcess.exec);

class GitApi {
  constructor(repoUrl, repoDir) {
    this.repoUrl = repoUrl;
    this.repoDir = repoDir;
  }

  async getCommitMessage(commitHash) {
    let res;
    try {
      const {stdout} = await execFile(
        'git',
        ['show', '--no-patch', `--pretty=format:%B`, commitHash],
        {
          cwd: this.repoDir,
        }
      );
      res = stdout;
    } catch (e) {
      console.error(`Error: ${e.cmd}`);
      return;
    }
    return res.trim();
  }

  async getAuthorName(commitHash) {
    let res;
    try {
      const {stdout} = await execFile(
        'git',
        ['show', '--no-patch', `--pretty=format:%an`, commitHash],
        {
          cwd: this.repoDir,
        }
      );
      res = stdout;
    } catch (e) {
      console.error(`Error: ${e.cmd}`);
      return;
    }
    return res.trim();
  }

  async getBranchName(commitHash) {
    let res;
    try {
      const {stdout} = await execFile('git', ['name-rev', commitHash], {
        cwd: this.repoDir,
      });
      res = stdout;
    } catch (e) {
      console.error(`Error: ${e.cmd}`);
      return;
    }
    return res.split(' ')[1];
  }

  async clone() {
    try {
      console.log(`Removing '${path.basename(this.repoDir)}'...`);
      await del(this.repoDir);
    } catch (e) {
      // It is fine if repo directory does not exists.
    }

    try {
      const {stdout, stderr} = await execFile('git', ['clone', this.repoUrl, this.repoDir]);
      console.log(stdout || stderr);
      return true;
    } catch (e) {
      console.log(`Error:`, e);
      return false;
    }
  }

  async execInRepo(command) {
    try {
      const {stdout} = await exec(command, {
        cwd: this.repoDir,
      });
      return {success: true, result: stdout};
    } catch (e) {
      console.log(`Error: ${e.cmd}`);
      return {success: false, result: e.stdout || e.stderr};
    }
  }

  async fetch() {
    try {
      const {stdout, stderr} = await execFile('git', ['fetch'], {
        cwd: this.repoDir,
      });
      console.log(stdout || stderr);
      return true;
    } catch (e) {
      console.log(`Error: ${e.cmd}`);
      return false;
    }
  }

  async checkout(commitHash) {
    try {
      const {stdout, stderr} = await execFile('git', ['checkout', commitHash], {
        cwd: this.repoDir,
      });
      console.log(stdout || stderr);
      return true;
    } catch (e) {
      console.log(`Error: ${e.cmd}`);
      return false;
    }
  }

  async checkoutWithFetch(commitHash) {
    const isChecked = await this.checkout(commitHash);
    if (!isChecked) {
      const isFetched = await this.fetch();
      if (isFetched) {
        return await this.checkout(commitHash);
      }
      return false;
    }
    return true;
  }
}

exports.GitApi = GitApi;
