describe('settings page >', () => {
  beforeEach(() => {
    cy.server();
    cy.route('GET', '/api/settings').as('fetch-settings');
  });

  it('shows empty form if there are no settings', () => {
    cy.deleteSettings();
    cy.visit('/settings');
    cy.wait('@fetch-settings');
    cy.get('{repoName}').should('have.value', '');
    cy.get('{buildCommand}').should('have.value', '');
    cy.get('{mainBranch}').should('have.value', '');
    cy.get('{period}').should('have.value', '0');
  });
});
