describe('Organization Onboarding - Regular Flow (Responsive)', () => {
  const orgName = 'Acme AI Solutions';
  const viewports = [
    { device: 'desktop', width: 1280, height: 800 },
    { device: 'tablet', width: 768, height: 1024 },
    { device: 'mobile', width: 375, height: 667 }
  ];

  viewports.forEach(({ device, width, height }) => {
    it(`completes onboarding on ${device}`, () => {
      cy.viewport(width, height);
      cy.fixture('user.json').then(user => {
        cy.visit('https://app.ellum.ai/login');
        cy.loginWithUser(user.email, user.password);
        cy.url().should('not.include', '/login');
        cy.get('a[href="/onboarding"]').click();
        cy.url().should('include', '/onboarding');
      });

      cy.get('input[name="name"]').type(orgName);
      cy.get('button[role="combobox"]').first().click();
      cy.contains('span', 'Technology & Software Development').click();
      cy.get('input[name="company_size"]').type('51-200');
      cy.get('textarea[name="description"]').type('We build AI-powered business solutions.');
      cy.get('input[name="target_audience"]').type('Enterprises and startups');
      cy.get('button').contains('Save and Next').click({ force: true });

      cy.get('input[name="competitors.0.competitor_name"]').type('CompetitorX');
      cy.get('input[name="competitors.0.competitor_link"]').type('https://competitorx.com');
      cy.get('button').contains('Save and Next').click({ force: true });

      cy.get('button[role="combobox"]').first().click();
      cy.contains('span', 'Professional').click();
      cy.get('input[type="file"][name="image"]').selectFile('cypress/fixtures/logo.jpeg', { force: true });
      cy.get('button[aria-label*="Select color"]').first().click();
      cy.get('button[role="combobox"]').last().click();
      cy.contains('span', 'Professional & Formal').click();
      cy.get('button').contains('Save and Next').click({ force: true });

      cy.get('button').contains('Submit').click({ force: true });
      cy.url().should('not.include', '/onboarding');
    });
  });
}); 