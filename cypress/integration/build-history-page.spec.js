describe('build history page >', () => {
  beforeEach(() => {
    cy.server();
    cy.route('GET', '/api/settings').as('fetch-settings');
  });

  it('shows progress on settings load', () => {
    cy.visit('/');
    cy.get('{main-progress}').should('be.visible');
    cy.wait('@fetch-settings');
    cy.get('{main-progress}').should('not.be.visible');
  });

  it('shows build history if settings exist', () => {
    cy.setSettings({
      repoName: 'repoName',
      mainBranch: 'mainBranch',
      buildCommand: 'buildCommand',
      period: 10,
    });
    cy.visit('/');
    cy.wait('@fetch-settings');
    cy.get('{build-history}').should('be.visible');
    cy.deleteSettings();
  });

  it('shows configure settings plug if settings do not exist', () => {
    cy.visit('/');
    cy.deleteSettings();
    cy.wait('@fetch-settings');
    cy.get('{configure-settings-plug}').should('be.visible');
  });
});
