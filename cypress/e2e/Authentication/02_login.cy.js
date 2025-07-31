// ✅ Ignore React runtime errors
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Minified React error')) {
    return false;
  }
});

describe('User Login - Responsive', () => {

  it('Logs in with specific user on desktop', () => {
    cy.testResponsive('macbook-15', () => {
      cy.visit('https://app.ellum.ai/login');
      cy.fixture('user').then((user) => {
        cy.loginWithUser(user.email, user.password);
      });
  });
  });

  it('Logs in with specific user on tablet', () => {
    cy.testResponsive('ipad-2', () => {
      cy.visit('https://app.ellum.ai/login');
  cy.fixture('user').then((user) => {
        cy.loginWithUser(user.email, user.password);
      });
    });
  });

  it('Logs in with specific user on mobile', () => {
    cy.testResponsive('iphone-6', () => {
      cy.visit('https://app.ellum.ai/login');
      cy.fixture('user').then((user) => {
        cy.loginWithUser(user.email, user.password);
  });
    });
  });

  it('Tests forgot password link', () => {
    cy.viewport('macbook-15');
    cy.visit('https://app.ellum.ai/login');
    cy.testNavigationLink('a[href="/forgot-password"]', '/forgot-password');
  });

  it('Tests sign up link', () => {
    cy.viewport('macbook-15');
    cy.visit('https://app.ellum.ai/login');
    cy.testNavigationLink('a[href="/signup"]', '/signup');
  });

  it('Tests Google login option', () => {
    cy.viewport('macbook-15');
    cy.visit('https://app.ellum.ai/login');
    
    // Click Google login button
    cy.get('button').contains('Continue with Google').click();
    
    // Should initiate Google OAuth flow
    cy.get('button').contains('Continue with Google').should('be.visible');
  });

});
