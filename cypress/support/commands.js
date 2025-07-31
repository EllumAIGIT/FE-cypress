// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// ✅ Ignore React runtime errors globally
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Minified React error')) {
    return false;
  }
});

// ✅ Custom command: Accept cookies if banner is visible
Cypress.Commands.add('acceptCookiesIfVisible', () => {
  cy.get('body').then($body => {
    if ($body.find('button:contains("Accept cookies")').length) {
      cy.contains('button', 'Accept cookies').click();
    }
  });
});

// ✅ Custom command: Login with specific user
Cypress.Commands.add('loginWithUser', (email, password) => {
  cy.acceptCookiesIfVisible();
  
  // Wait for page to load and verify we're on login page
  cy.get('h2').should('contain', 'Login');
  cy.get('p').should('contain', 'Welcome back! Please enter your details.');

  // Fill login form
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#rememberInfo').click();
  cy.get('button[type="submit"]').should('not.be.disabled').click();

  // Wait for login process to complete
  cy.wait(6000);
  cy.url().should('not.include', '/login');
  
  // Verify we're on the organization selection page with create organization element
  cy.get('h1').should('contain', 'Where to?');
  cy.get('a[href="/onboarding"]').should('be.visible');
  cy.get('a[href="/onboarding"]').should('contain', 'Create new Organization');
});

// ✅ Custom command: Register new user
Cypress.Commands.add('registerNewUser', (userData = {}) => {
  const timestamp = Date.now();
  const defaultUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: `john.doe+${timestamp}@yopmail.com`,
    password: 'SecurePass123!'
  };
  
  const testUser = { ...defaultUser, ...userData };
  
  cy.acceptCookiesIfVisible();
  
  // Wait for page to load
  cy.get('h2').should('contain', 'Create your account');
  cy.get('p').should('contain', "Hello there! Let's create your account.");

  // Fill registration form
  cy.get('#first_name').type(testUser.firstName);
  cy.get('#last_name').type(testUser.lastName);
  cy.get('#email').type(testUser.email);
  cy.get('#password').type(testUser.password);
  cy.get('#confirm_password').type(testUser.password);
  cy.get('#privacy').check();

  // Submit the form
  cy.get('button[type="submit"]').should('not.be.disabled').click();
  cy.wait(5000)
  cy.url().should('not.include', '/signup');

  // Save the registration data
  cy.writeFile('cypress/fixtures/registered_user.json', testUser);
  
  // Log the credentials for manual testing if needed
  cy.log(`✅ Registration successful! Email: ${testUser.email}, Password: ${testUser.password}`);
});

// ✅ Custom command: Test navigation link
Cypress.Commands.add('testNavigationLink', (linkSelector, expectedUrl) => {
  cy.get(linkSelector).click();
  cy.url().should('include', expectedUrl);
});

// ✅ Custom command: Test responsive viewport
Cypress.Commands.add('testResponsive', (viewport, testFunction) => {
  cy.viewport(viewport);
  testFunction();
});

// ✅ Custom command: Create organization
Cypress.Commands.add('createOrganization', (orgData = {}) => {
  const timestamp = Date.now();
  const defaultOrg = {
    name: `Test Organization ${timestamp}`,
    description: 'Test organization description'
  };
  
  const testOrg = { ...defaultOrg, ...orgData };
  
  // Navigate to organization creation
  cy.get('a[href="/onboarding"]').click();
  cy.url().should('include', '/onboarding');
  
  // Fill organization form
  cy.get('#organization_name, #name, input[name="name"], input[placeholder*="organization"]').type(testOrg.name);
  cy.get('#description, textarea[name="description"], textarea[placeholder*="description"]').type(testOrg.description);
  
  // Submit the form
  cy.get('button[type="submit"]').should('not.be.disabled').click();
  
  // Verify successful creation
  cy.url().should('not.include', '/onboarding');
  
  // Save organization data for future tests
  cy.writeFile('cypress/fixtures/organization.json', {
    ...testOrg,
    createdAt: new Date().toISOString()
  });
  
  cy.log(`✅ Organization created successfully! Name: ${testOrg.name}`);
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })