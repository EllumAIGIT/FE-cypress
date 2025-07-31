const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://app.ellum.ai/signup",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
