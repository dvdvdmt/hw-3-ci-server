const Message = {
  INIT_REPO: 'INIT_REPO',
  RUN_BUILD: 'RUN_BUILD',
};

function initRepo() {
  return {type: Message.INIT_REPO};
}

function runBuild(payload) {
  return {type: Message.INIT_REPO, payload};
}

function handleMessage(handlers, typeKey = 'type') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (message) => {
    const messageType = message[typeKey];
    if (!messageType || typeof messageType !== 'string') {
      console.error(`Message must have key '${typeKey}' of string value.`, message);
      return;
    }
    const handler = handlers[messageType];
    if (!handler) {
      console.error(`There is no handler for the message['${typeKey}'] = ${messageType}`);
      return;
    }
    handler(message);
  };
}

module.exports = {initRepo, handleMessage, Message, runBuild};
