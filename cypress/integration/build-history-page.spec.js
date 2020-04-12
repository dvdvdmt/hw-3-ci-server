describe('build history page >', () => {
  beforeEach(() => {
    cy.server();
  });

  it('shows progress on settings load', () => {
    cy.route({
      method: 'GET',
      url: '/api/settings',
      response: {},
      delay: 1000,
    }).as('fetch-settings');
    cy.visit('/');
    cy.get('{main-progress}').should('be.visible');
    cy.wait('@fetch-settings');
    cy.get('{main-progress}').should('not.be.visible');
  });

  it('shows build history if settings exist', () => {
    cy.route('GET', '/api/settings', 'fixture:default-settings').as('fetch-settings');
    cy.visit('/');
    cy.wait('@fetch-settings');
    cy.get('{build-history}').should('be.visible');
  });

  it('shows configure settings plug if settings do not exist', () => {
    cy.route('GET', '/api/settings', {}).as('fetch-settings');
    cy.visit('/');
    cy.wait('@fetch-settings');
    cy.get('{configure-settings-plug}').should('be.visible');
    cy.get('{run-build-button}').should('not.be.visible');
  });

  it('opens settings with a click on configure settings plug', () => {
    cy.route('GET', '/api/settings', {}).as('fetch-settings');
    cy.visit('/');
    cy.wait('@fetch-settings');
    cy.get('{to-settings-plug-button}').click();
    cy.location('pathname').should('equal', '/settings');
    cy.get('{settings-page}').should('be.visible');
  });

  it('opens settings with a click on nav menu button', () => {
    cy.route('GET', '/api/settings', 'fixture:default-settings').as('fetch-settings');
    cy.visit('/');
    cy.wait('@fetch-settings');
    cy.get('{build-history}').should('be.visible');
    cy.get('{to-settings-menu-button}').click();
    cy.location('pathname').should('equal', '/settings');
    cy.get('{settings-page}').should('be.visible');
  });

  it('shows plug on empty builds', () => {
    cy.route('GET', '/api/settings', 'fixture:default-settings').as('fetch-settings');
    cy.visit('/');
    cy.wait('@fetch-settings');
    cy.get('{empty-builds-plug}').should('be.visible');
    cy.get('{empty-builds-plug-button}').click();
    cy.get('{run-build-form}').should('be.visible');
  });

  it.skip('runs new build and shows it in the build list', () => {
    console.log('123', 123);
  });
});
