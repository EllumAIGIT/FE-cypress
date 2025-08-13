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
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
  },
  overrides: [
    {
      files: ['cypress/**/*.js'],
      rules: {
        'cypress/no-assigning-return-values': 'off',
      },
    },
  ],
}; 