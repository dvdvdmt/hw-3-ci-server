describe('modal >', () => {
  before(() => {
    cy.fixture('default-settings.json').then((settings) => {
      cy.setSettings(settings);
    });
  });

  beforeEach(() => {
    cy.server();
    cy.route('GET', '/api/settings').as('fetch-settings');
  });

  after(() => {
    cy.deleteSettings();
  });

  it('opens modal', () => {
    cy.visit('/');
    cy.wait('@fetch-settings');
    cy.get('{run-build-button}').click();
    cy.get('{run-build-form}').should('be.visible');
  });

  it('must stay open if click was made inside modal card', () => {
    cy.visit('/');
    cy.wait('@fetch-settings');
    cy.get('{run-build-button}').click();
    cy.get('{modal-card}').click();
    cy.get('{modal-card}').should('be.visible');
  });

  it('closes modal on overlay click', () => {
    cy.visit('/');
    cy.wait('@fetch-settings');
    cy.get('{run-build-button}').click();
    cy.get('{modal-overlay}').click('left');
    cy.get('{modal-card}').should('not.be.visible');
  });

  it('closes modal on ESC key', () => {
    cy.visit('/');
    cy.wait('@fetch-settings');
    cy.get('{run-build-button}').click();
    cy.get('{modal-card}').type('{esc}');
    cy.get('{modal-card}').should('not.be.visible');
  });
});
