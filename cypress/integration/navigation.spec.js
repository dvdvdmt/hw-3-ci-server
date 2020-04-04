describe('navigation >', () => {
  it('opens settings configure plug', () => {
    cy.deleteSettings();
    cy.visit('/');
    cy.get('{configure-settings-plug}').should('be.visible');
  });

  it('opens root page on invalid route', () => {
    cy.visit('/non/existing/route');
    cy.url().should('not.equal', /\/non\/existing\/route\/$/);
  });

  it('opens settings page', () => {
    cy.visit('/settings');
    cy.url().should('match', /\/settings$/);
    cy.get('{settings-page}').should('be.visible');
  });

  it('opens build details page', () => {
    cy.visit('/build/123');
    cy.url().should('match', /\/build\/123$/);
    cy.get('{build-details-page}').should('be.visible');
  });
});
