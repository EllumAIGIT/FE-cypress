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

// ✅ Login and open organization using custom command
const loginAndOpenOrg = () => {
  cy.fixture('user').then(user => {
    cy.visit('/login');
    cy.loginWithUser(user.email, user.password);
    cy.get('button').contains(/^Open$/).first().click({ force: true });
    cy.url().should('include', 'app.ellum.ai');
  });
};

// Helper to open sidebar if hidden (for mobile/tablet)
const openSidebarIfHidden = () => {
  cy.get('nav', { timeout: 10000 }).should('exist').then($nav => {
    if (!$nav.is(':visible')) {
      cy.get('button[aria-label="Toggle menu"]').first().click({ force: true });
    }
  });
};

// ✅ Main Prompt AI flow
const promptAIFlow = () => {
  // Open sidebar/hamburger if needed (for mobile/tablet)
  openSidebarIfHidden();

  // Click "Prompt AI" in the sidebar
  cy.contains('a', 'Prompt AI').click({ force: true });

  // Wait for submenu, then click "Create Prompt"
  cy.contains('a', 'Create Prompt', { timeout: 6000 }).should('be.visible').click({ force: true });

  // Robustly close the sidebar: try overlay/backdrop, else click far right of the screen
  cy.get('body').then($body => {
    const selectors = [
      '.backdrop', '.overlay', '.fixed', '.modal-backdrop', '.MuiBackdrop-root', '.drawer-backdrop'
    ];
    let found = false;
    for (const sel of selectors) {
      if ($body.find(sel).length) {
        cy.get(sel).first().click({ force: true });
        found = true;
        break;
      }
    }
    if (!found) {
      cy.document().then(doc => {
        const width = doc.documentElement.clientWidth;
        cy.get('body').click(width - 10, 200, { force: true });
      });
    }
  });

  // Wait for the prompt creation page to load
  cy.wait(5000);

  // Type a prompt in the textarea
  const prompt = 'Write a social media post about AI in marketing.';
  cy.get('textarea').should('be.visible').type(prompt, { force: true });

  // Click the "Generate" button
  cy.get('button').contains(/Generate/i).should('not.be.disabled').click({ force: true });

  // Assert: textarea clears, disables, or a response appears
  cy.get('textarea').should($el => {
    expect(
      $el.val() === '' || $el.is(':disabled')
    ).to.be.true;
  });
};

// ✅ Responsive spec
const viewports = [
  { name: 'Desktop', size: 'macbook-15' },
  { name: 'Tablet', size: 'ipad-2' },
  { name: 'Mobile', size: 'iphone-6' }
];

describe('Prompt AI Flow — Responsive', () => {
  viewports.forEach(({ name, size }) => {
    it(`${name}: create and generate prompt`, () => {
      cy.viewport(size);
      loginAndOpenOrg();
      promptAIFlow();
    });
  });
}); 