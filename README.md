# Ellum AI - Cypress Test Suite

## About

Comprehensive end-to-end test suite for Ellum AI application using Cypress.

## Test Coverage

### Authentication Tests
- User registration flow
- User login flow  
- Forgot password functionality

### Organization Tests
- Organization creation
- Organization opening and navigation

### Dashboard Tests
- Overview page functionality
- Prompt AI generation
- Knowledge Center (file upload & URL scraping)
- Teams management (add, edit, delete members)
- Messages/Chat functionality

## Features

- **Responsive Testing**: All tests run on desktop, tablet, and mobile viewports
- **Robust Selectors**: Uses reliable element selectors that handle UI changes
- **Custom Commands**: Reusable Cypress commands for common operations
- **Error Handling**: Graceful handling of application errors and timeouts
- **Cross-browser Compatibility**: Tests work across different browsers

## Setup

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npx cypress run

# Open Cypress Test Runner
npx cypress open

# Run specific test suite
npx cypress run --spec "cypress/e2e/Authentication/*.cy.js"
```

## Test Structure

```
cypress/
├── e2e/
│   ├── Authentication/
│   │   ├── 01_signup.cy.js
│   │   ├── 02_login.cy.js
│   │   └── 03_forgot_password.cy.js
│   ├── Organization/
│   │   ├── 01_create_organization.cy.js
│   │   └── 02_opening_organization.cy.js
│   └── Dashboard/
│       ├── 01_overview.cy.js
│       ├── 02_prompt_ai.cy.js
│       ├── 03_knowledge_center.cy.js
│       ├── 04_teams.cy.js
│       └── 05_messages.cy.js
├── fixtures/
│   ├── user.json
│   ├── registered_user.json
│   └── logo.jpeg
└── support/
    └── commands.js
```

## Configuration

- **Base URL**: https://app.ellum.ai
- **Default User**: ellumai@yopmail.com
- **Viewports**: Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)

## Custom Commands

- `cy.loginWithUser(email, password)` - Handles login flow
- `cy.registerNewUser(userData)` - Registers new user
- `cy.createOrganization(orgData)` - Creates organization
- `cy.testResponsive(viewport, testFunction)` - Runs tests across viewports

## Best Practices

- All tests are responsive and work across devices
- Robust error handling for application-side errors
- Reusable helper functions to reduce code duplication
- Comprehensive assertions to ensure test reliability
- Proper wait times for asynchronous operations

## Contributing

1. Follow the existing test structure
2. Add responsive testing for all new features
3. Use custom commands for common operations
4. Include proper error handling
5. Add comprehensive assertions

## License

This project is for Ellum AI regression testing.
