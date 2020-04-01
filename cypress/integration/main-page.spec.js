describe('main page >', () => {
  beforeEach(() => {
    cy.server();
    cy.route('GET', '/api/settings').as('fetch-settings');
  });

  it('shows progress on settings load', () => {
    cy.visit('/');
    cy.get('{main-progress}').should('be.visible');
    // cy.wait('@fetch-settings');
    cy.get('{main-progress}').should('not.be.visible');
  });
});
