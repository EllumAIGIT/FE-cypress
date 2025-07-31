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

const goToMessages = () => {
  openSidebarIfHidden();
  cy.contains('a', 'Messages').should('be.visible').click({ force: true });
  cy.wait(5000);
  cy.url().should('include', '/messages');
};

const assertMessagesPage = () => {
  cy.contains('span', 'Messages').should('be.visible');
  // Assert at least one message card is present
  cy.get('div[role="button"]').should('exist');
  // Click the first message card
  cy.get('div[role="button"]').first().click({ force: true });
  // Assert chat box or empty state appears
  cy.get('#message-chat-box').should('exist');
  cy.get('#message-chat-box').should('be.visible');

  // --- Send a message ---
  const testMessage = 'Hello from Cypress!';
  // Try textarea first, fallback to input[type=text]
  cy.get('#message-chat-box textarea, #message-chat-box input[type="text"]').last().type(testMessage, { force: true });
  // Try to find a send button (by text or aria-label)
  cy.get('#message-chat-box button').filter(':visible').then($btns => {
    const sendBtn = $btns.filter((i, el) => {
      const txt = Cypress.$(el).text().toLowerCase();
      const aria = Cypress.$(el).attr('aria-label') || '';
      return txt.includes('send') || aria.toLowerCase().includes('send');
    });
    if (sendBtn.length) {
      cy.wrap(sendBtn[0]).click({ force: true });
    } else {
      // fallback: click the last visible button
      cy.wrap($btns.last()).click({ force: true });
    }
  });
  // Assert the message appears in the chat
  cy.contains(testMessage).should('be.visible');
};

const viewports = [
  { name: 'Desktop', size: 'macbook-15' },
  { name: 'Tablet', size: 'ipad-2' },
  { name: 'Mobile', size: 'iphone-6' }
];

describe('Messages Flow — Responsive', () => {
  viewports.forEach(({ name, size }) => {
    it(`${name}: open messages and select a chat`, () => {
      cy.viewport(size);
      openOrganization();
      goToMessages();
      assertMessagesPage();
    });
  });
}); 