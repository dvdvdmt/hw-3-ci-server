const {Message, handleMessage} = require('./messages.js');

const {repoManager} = require('./repo-manager.js');

process.on(
  'message',
  handleMessage({
    [Message.INIT_REPO]: () => {
      repoManager.initialize();
    },
    [Message.RUN_BUILD]: ({payload: {commitHash}}) => {
      repoManager.runBuildCommand(commitHash);
    },
  })
);
