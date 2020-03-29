const dotenvPlugin = require('cypress-dotenv');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (_on, config) => {
  return dotenvPlugin(config);
};
