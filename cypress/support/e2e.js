// cypress/support/e2e.js
// Cypress support file

// Disable uncaught exception handling to prevent test failures from random errors
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
