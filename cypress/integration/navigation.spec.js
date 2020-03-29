describe('navigation', () => {
  it('opens settings configure plug', () => {
    cy.visit('/');
    cy.get('{configure-plug}').should('be.visible');
  });

  it('opens root page on invalid route', () => {
    cy.visit('/non/existing/route');
    cy.url().should('match', /\/$/);
  });
});
