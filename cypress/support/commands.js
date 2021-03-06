Cypress.Commands.overwrite('get', (originalFn, selector, options) =>
  originalFn(addDataTestSelectors(selector), options)
);

/**
 * Takes a selector string and turns all {foo} to [data-test="foo"]
 * @param {string} selector - Original selector
 */
function addDataTestSelectors(selector) {
  return selector.replace(/{([-\w]+)}/g, '[data-test="$1"]');
}

Cypress.Commands.add('deleteSettings', () => {
  cy.request('DELETE', '/api/settings');
});

Cypress.Commands.add('setSettings', (settings) => {
  cy.request('POST', '/api/settings', settings);
});
