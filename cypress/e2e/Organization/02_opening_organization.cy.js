describe('Opening Organization (Responsive)', () => {
  const orgName = 'Acme AI Solutions';
  const viewports = [
    { device: 'desktop', width: 1280, height: 800 },
    { device: 'tablet', width: 768, height: 1024 },
    { device: 'mobile', width: 375, height: 667 }
  ];

  viewports.forEach(({ device, width, height }) => {
    it(`opens the created organization on ${device}`, () => {
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
    });
  });
}); 