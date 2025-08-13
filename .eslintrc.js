module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['cypress'],
  rules: {
    // Cypress-specific rules - allow necessary patterns
    'cypress/no-assigning-return-values': 'off',
    'cypress/no-unnecessary-waiting': 'off', // Allow cy.wait() when needed
    'cypress/assertion-before-screenshot': 'off',
    'cypress/no-force': 'off', // Allow force: true when needed
    'cypress/require-data-selectors': 'off', // Allow other selectors
    'cypress/unsafe-to-chain-command': 'off', // Allow chaining commands
    
    // General rules - more lenient for testing
    'no-console': 'off', // Allow console.log in tests
    'no-unused-vars': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    
    // Allow common Cypress patterns
    'no-await-in-loop': 'off',
    'no-loop-func': 'off',
  },
  overrides: [
    {
      files: ['cypress/**/*.js'],
      rules: {
        // Disable strict rules for test files
        'cypress/no-assigning-return-values': 'off',
        'cypress/no-unnecessary-waiting': 'off',
        'cypress/assertion-before-screenshot': 'off',
        'cypress/no-force': 'off',
        'cypress/require-data-selectors': 'off',
        'cypress/unsafe-to-chain-command': 'off', // Allow chaining in tests
        'no-console': 'off',
        'no-unused-vars': 'off', // Allow unused variables in tests
        'prefer-const': 'off', // Allow let in test loops
      },
    },
  ],
}; 