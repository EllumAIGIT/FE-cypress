// ✅ Ignore React runtime errors and focus-related uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('Minified React error') ||
    (err.message.includes('Cannot read properties of null') && err.message.includes('focus')) ||
    err.message.includes('Failed to execute')
  ) {
    return false;
  }
});

const orgName = 'Acme AI Solutions';

const openOrganization = () => {
  cy.fixture('user.json').then(user => {
    cy.visit('https://app.ellum.ai/login');
    cy.loginWithUser(user.email, user.password);
    cy.url().should('not.include', '/login');
  });
  cy.contains('h2', orgName).should('be.visible')
    .parents('div.flex.items-center.justify-between')
    .find('button').contains('Open').click({ force: true });
  cy.wait(6000);
  cy.url().should('not.include', '/where-to');
};

const openSidebarIfHidden = () => {
  cy.get('nav', { timeout: 10000 }).should('exist').then($nav => {
    if (!$nav.is(':visible')) {
      cy.get('button[aria-label="Toggle menu"], button[aria-label="Open navigation menu"], .hamburger').first().click({ force: true });
    }
  });
};

const goToTeams = () => {
  openSidebarIfHidden();
  cy.contains('a', 'Teams').should('be.visible').click({ force: true });
  cy.wait(5000)
  cy.url().should('include', '/teams');
};

const addTeamMember = () => {
  cy.contains('button', 'Add New Member').should('be.visible').click({ force: true });
  cy.get('h3').should('contain', 'Invite User');
  const timestamp = Date.now();
  cy.get('input[name="first_name"]').type('Test', { force: true });
  cy.get('input[name="last_name"]').type('User', { force: true });
  cy.get('input[name="email"]').type(`testuser+${timestamp}@yopmail.com`, { force: true });
  cy.get('input[name="role_name"]').type('QA', { force: true });

  // Select at least one permission (required)
  cy.contains('button[role="combobox"]', 'Select Permissions').click({ force: true });
  cy.contains('label', 'can create content').click({ force: true });

  cy.get('button[type="submit"]').contains('Invite').click({ force: true });
  cy.contains('td', `testuser+${timestamp}@yopmail.com`).should('exist');
};

const editTeamMember = () => {
  // Find the first edit button in the team table and click it
  cy.get('button').filter(':visible').find('svg.lucide-pencil-line').parents('button').first().click({ force: true });
  cy.get('h3').should('contain', 'Update');
  cy.get('input[name="first_name"]').clear().type('Edited', { force: true });
  cy.get('button').contains('Save').click({ force: true });
  // Assert update (adjust as needed)
  cy.contains('td', 'Edited').should('exist');
};

const deleteTeamMember = () => {
  // Find the first delete button in the team table and click it
  cy.get('button').filter(':visible').find('svg.lucide-trash2, svg.lucide-trash-2').parents('button').first().click({ force: true });
  cy.get('h3').should('contain', 'Delete');
  cy.contains('button', 'Delete').click({ force: true });
  // Assert deletion (adjust as needed)
  cy.contains('td', 'Edited').should('not.exist');
};

const viewports = [
  { name: 'Desktop', size: 'macbook-15' },
  { name: 'Tablet', size: 'ipad-2' },
  { name: 'Mobile', size: 'iphone-6' }
];

describe('Teams Flow — Responsive', () => {
  viewports.forEach(({ name, size }) => {
    it(`${name}: add, edit, and delete team member`, () => {
      cy.viewport(size);
      openOrganization();
      goToTeams();
      addTeamMember();
      editTeamMember();
      deleteTeamMember();
    });
  });
}); 