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

const knowledgeCenterFlow = () => {
  openSidebarIfHidden();
  cy.contains('a', 'Knowledge Center').should('be.visible').click({ force: true });
  cy.wait(5000)
  cy.url().should('include', '/knowledge-center');

  // Click Add Knowledge
  cy.contains('button', 'Add Knowledge').should('be.visible').click({ force: true });

  // --- Upload File Flow ---
  cy.contains('button', 'Upload Your files').should('be.visible').click({ force: true });
  cy.get('input[type="file"]').selectFile('cypress/fixtures/logo.jpeg', { force: true });
  cy.contains('p', 'Uploaded files will appear here').should('be.visible');
  cy.contains('button', 'Close').click({ force: true });

  // --- Scrape URL Flow ---
  cy.contains('button', 'Add Knowledge').should('be.visible').click({ force: true });
  cy.contains('button', 'Scrape URL').should('be.visible').click({ force: true });
  cy.get('input[name="site_url"]').type('example.com', { force: true });
  cy.contains('p', 'Added websites appear here').should('be.visible');
  cy.contains('button', 'Cancel').click({ force: true });
};

const viewports = [
  { name: 'Desktop', size: 'macbook-15' },
  { name: 'Tablet', size: 'ipad-2' },
  { name: 'Mobile', size: 'iphone-6' }
];

describe('Knowledge Center Flow — Responsive', () => {
  viewports.forEach(({ name, size }) => {
    it(`${name}: upload file and scrape url`, () => {
      cy.viewport(size);
      openOrganization();
      knowledgeCenterFlow();
    });
  });
}); 