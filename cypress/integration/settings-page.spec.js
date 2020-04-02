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

  it('shows settings if they exist', () => {
    const settings = {
      repoName: 'my-repo-name',
      buildCommand: 'npm run build',
      mainBranch: 'master',
      period: 10,
    };
    cy.setSettings(settings);
    cy.visit('/settings');
    cy.wait('@fetch-settings');
    cy.get('{repoName}').should('have.value', settings.repoName);
    cy.get('{buildCommand}').should('have.value', settings.buildCommand);
    cy.get('{mainBranch}').should('have.value', settings.mainBranch);
    cy.get('{period}').should('have.value', `${settings.period}`);
    cy.deleteSettings();
  });
});
