// ✅ Ignore React runtime errors and focus-related uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
    if (
      err.message.includes('Minified React error') ||
      (err.message.includes('Cannot read properties of null') && err.message.includes('focus')) ||
      err.message.includes('Failed to execute') // covers NotFoundError
    ) {
      return false;
    }
  });
  
  describe('Prompt AI Flow (Responsive)', () => {
  const orgName = 'Acme AI Solutions';
  const viewports = [
    { device: 'desktop', width: 1280, height: 800 },
    { device: 'tablet', width: 768, height: 1024 },
    { device: 'mobile', width: 375, height: 667 }
  ];

  viewports.forEach(({ device, width, height }) => {
    it(`should create and generate a prompt on ${device}`, () => {
      cy.viewport(width, height);
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

      // Open hamburger/nav menu if not visible
      cy.get('nav', { timeout: 10000 }).should('exist').then($nav => {
        if (!$nav.is(':visible')) {
          cy.get('button[aria-label="Toggle menu"]').first().click({ force: true });
        }
      });

      // Navigate to Prompt AI
      cy.contains('a', 'Prompt AI').click({ force: true });
      cy.contains('a', 'Create Prompt', { timeout: 6000 }).should('be.visible').click({ force: true });

      // Wait for the prompt creation page to load
      cy.wait(5000);

      // Type a prompt in the textarea and trigger input event
      cy.get('form textarea')
        .should('be.visible')
        .type('Write a social media post about AI in marketing.')
        .trigger('input');

      // Wait for the Generate button to become enabled and click it (using .contains(/Generate/i))
      cy.contains('button', /Generate/i)
        .should('be.visible')
        .should('not.be.disabled')
        .click({ force: true });

      // Assert: textarea clears, disables, or a response appears
      cy.get('form textarea').should($el => {
        expect(
          $el.val() === '' || $el.is(':disabled')
        ).to.be.true;
      });
    });
  });
}); 