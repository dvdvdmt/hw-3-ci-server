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
    cy.deleteSettings();
    cy.visit('/');
    cy.wait('@fetch-settings');
    cy.get('{configure-settings-plug}').should('be.visible');
    cy.get('{run-build-button}').should('not.be.visible');
  });

  it('opens settings with a click on configure settings plug', () => {
    cy.deleteSettings();
    cy.visit('/');
    cy.wait('@fetch-settings');
    cy.get('{to-settings-plug-button}').click();
    cy.location('pathname').should('equal', '/settings');
    cy.get('{settings-page}').should('be.visible');
  });

  it('opens settings with a click on nav menu button', () => {
    cy.setSettings({
      repoName: 'repoName',
      mainBranch: 'mainBranch',
      buildCommand: 'buildCommand',
      period: 10,
    });
    cy.visit('/');
    cy.wait('@fetch-settings');
    cy.get('{build-history}').should('be.visible');
    cy.get('{to-settings-menu-button}').click();
    cy.location('pathname').should('equal', '/settings');
    cy.get('{settings-page}').should('be.visible');
  });

  it.skip('opens modal window to run build', () => {
    cy.setSettings({
      repoName: 'hw-3-public-repo-example',
      mainBranch: 'main',
      buildCommand: 'npm run --silent build',
      period: 1,
    });
    cy.visit('/');
    cy.wait('@fetch-settings');
    cy.get('{run-build-button}').click();
    cy.get('{run-build-modal}').should('be.visible');
  });
});
