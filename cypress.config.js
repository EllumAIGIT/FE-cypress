const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Base configuration
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://app.ellum.ai',
    viewportWidth: 1920,
    viewportHeight: 1080,
    
    // Performance optimizations
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    
    // Retry configuration
    retries: {
      runMode: 2,
      openMode: 1
    },
    
    // Timeout configurations
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 60000,
    
    // Test configuration
    specPattern: 'cypress/e2e/**/*.cy.js',
    excludeSpecPattern: [
      'cypress/e2e/**/*.skip.cy.js',
      'cypress/e2e/**/*.wip.cy.js'
    ],
    
    // Environment variables
    env: {
      environment: process.env.NODE_ENV || 'development',
      apiUrl: process.env.CYPRESS_API_URL || 'https://api.ellum.ai',
      userEmail: process.env.CYPRESS_USER_EMAIL || 'test@example.com',
      userPassword: process.env.CYPRESS_USER_PASSWORD || 'testpassword',
      headless: process.env.CYPRESS_HEADLESS || false,
      video: process.env.CYPRESS_VIDEO !== 'false',
      screenshots: process.env.CYPRESS_SCREENSHOTS !== 'false'
    },
    
    // Reporter configuration
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportPageTitle: 'Ellum AI Test Report',
      embeddedScreenshots: true,
      inlineAssets: true
    },
    
    // Setup and teardown
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        table(message) {
          console.table(message);
          return null;
        }
      });
      
      // Environment-specific configuration
      if (config.env.environment === 'staging') {
        config.baseUrl = 'https://staging.ellum.ai';
      } else if (config.env.environment === 'production') {
        config.baseUrl = 'https://app.ellum.ai';
      }
      
      return config;
    },
    
    // Browser configuration
    browsers: [
      {
        name: 'chrome',
        family: 'chromium',
        channel: 'stable'
      },
      {
        name: 'firefox',
        family: 'firefox',
        channel: 'stable'
      },
      {
        name: 'edge',
        family: 'chromium',
        channel: 'stable'
      }
    ],
    
    // Experimental features
    experimentalStudio: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    
    // Network handling
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    
    // File handling
    downloadsFolder: 'cypress/downloads',
    fixturesFolder: 'cypress/fixtures',
    supportFile: 'cypress/support/e2e.js',
    
    // Performance monitoring
    numTestsKeptInMemory: 0,
    
    // Screenshot configuration
    screenshotsFolder: 'cypress/screenshots',
    
    // Video configuration
    videosFolder: 'cypress/videos',
    
    // Test isolation
    testIsolation: true
  },
  
  // Component testing configuration
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    },
    specPattern: 'cypress/component/**/*.cy.js'
  },
  
  // Global configuration
  watchForFileChanges: false,
  scrollBehavior: 'center',
  
  // Custom commands
  experimentalRunAllSpecs: true,
  
  // Performance budgets
  performance: {
    budgets: [
      {
        resourceType: 'script',
        budget: 300
      },
      {
        resourceType: 'total',
        budget: 1000
      }
    ]
  }
});
