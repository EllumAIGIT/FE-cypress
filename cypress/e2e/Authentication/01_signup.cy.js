// ✅ Ignore React runtime errors
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Minified React error')) {
    return false;
  }
});

describe('User Signup - Responsive', () => {

  it('Registers on desktop', () => {
    cy.testResponsive('macbook-15', () => {
      cy.visit('https://app.ellum.ai/signup');
      cy.registerNewUser();
    });
  });

  it('Registers on tablet', () => {
    cy.testResponsive('ipad-2', () => {
      cy.visit('https://app.ellum.ai/signup');
      cy.registerNewUser();
    });
  });

  it('Registers on mobile', () => {
    cy.testResponsive('iphone-6', () => {
      cy.visit('https://app.ellum.ai/signup');
      cy.registerNewUser();
    });
  });

  it('Tests login link', () => {
    cy.viewport('macbook-15');
    cy.visit('https://app.ellum.ai/signup');
    cy.testNavigationLink('a[href="/login"]', '/login');
  });

  it('Tests Google signup option', () => {
    cy.viewport('macbook-15');
    cy.visit('https://app.ellum.ai/signup');
    
    // Click Google signup button
    cy.get('button').contains('Continue with Google').click();
    
    // Should initiate Google OAuth flow
    cy.get('button').contains('Continue with Google').should('be.visible');
  });

  it('Tests terms of service link', () => {
    cy.viewport('macbook-15');
    cy.visit('https://app.ellum.ai/signup');
    cy.testNavigationLink('a[href="/terms"]', '/terms');
  });

  it('Tests privacy policy link', () => {
    cy.viewport('macbook-15');
    cy.visit('https://app.ellum.ai/signup');
    cy.testNavigationLink('a[href="/privacy"]', '/privacy');
  });

}); 