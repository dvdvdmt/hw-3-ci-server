describe('navigation', () => {
  it('opens main page', () => {
    cy.visit('/');
    cy.get('{configure-plug}').should('be.visible');
  });
});
