/* eslint-disable no-console */

module.exports = (env) => {
  if (env.prod) {
    return require('./webpack-prod.config.js');
  }
  if (env.dev) {
    return require('./webpack-dev.config.js');
  }
  console.error('There is no config for provided environment', env);
  return {};
};
