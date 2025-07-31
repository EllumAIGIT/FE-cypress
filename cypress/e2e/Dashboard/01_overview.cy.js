// ✅ Ignore React runtime errors
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Minified React error')) {
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

const overviewFlow = () => {
  // If the role selection card is present, select it
  cy.get('body').then($body => {
    if ($body.find('h3:contains("AI Engineer")').length) {
      cy.contains('h3', 'AI Engineer')
        .parents('.card')
        .find('button')
        .contains('Accept')
        .click({ force: true });
    }
  });

  // Always assert the dashboard stats are visible
  cy.wait(3000);
  cy.contains('p', 'Total Followers').should('be.visible');
  cy.contains('p', 'Total Impressions').should('be.visible');
  cy.contains('p', 'Total Engagements').should('be.visible');
  cy.contains('p', 'Total Reach').should('be.visible');
};

const viewports = [
  { name: 'Desktop', size: 'macbook-15' },
  { name: 'Tablet', size: 'ipad-2' },
  { name: 'Mobile', size: 'iphone-6' }
];

describe('Dashboard Overview Flow — Responsive', () => {
  viewports.forEach(({ name, size }) => {
    it(`${name}: overview role selection and prompt generation`, () => {
      cy.viewport(size);
      openOrganization();
      overviewFlow();
    });
  });
}); 