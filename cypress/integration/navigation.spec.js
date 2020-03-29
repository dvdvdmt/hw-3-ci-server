describe('navigation', () => {
  it('opens main page', () => {
    cy.visit('/');
    cy.get('{main-page}').should('be.visible');
  });
});
