# E2E Testing with Cypress

This project includes comprehensive End-to-End (E2E) tests using Cypress to automatically test key features of the Larry's Honda website.

## Installation

1. **Install Cypress as a dev dependency:**
   ```bash
   npm install --save-dev cypress
   ```

2. **Install other optional testing tools (recommended):**
   ```bash
   npm install --save-dev @cypress/webpack-dev-server
   ```

## Running Tests

### Open Cypress Test Runner (Interactive Mode)
```bash
npm run cypress:open
```
This opens the Cypress GUI where you can:
- Select which tests to run
- Watch tests execute in real-time
- Debug failures interactively
- View video recordings of test runs

### Run All Tests Headless (CI/CD Mode)
```bash
npm run cypress:run
```
This runs all tests in headless mode and outputs results to the terminal.

### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/hamburger-menu.cy.js"
```

### Run Tests on Specific Browser
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

## Test Files Overview

### 1. **hamburger-menu.cy.js**
Tests mobile navigation hamburger menu functionality:
- Hamburger menu visibility on mobile/desktop
- Opening/closing menu
- Menu closes when links are clicked
- Proper z-index layering

### 2. **navigation.cy.js**
Tests navigation and smooth scrolling:
- Navigation links scroll to correct sections
- Proper scroll offset accounting for navbar
- Navbar remains sticky while scrolling
- Hero CTA button navigation

### 3. **pagination.cy.js** ⭐ Important
Tests gallery pagination (addresses the page 3 issue):
- All pagination buttons display correctly
- Page navigation works (1, 2, 3)
- Previous/Next buttons function properly
- Button disabled states work correctly
- **Page 3 doesn't navigate to Contact section**
- Correct gallery items display on each page

### 4. **contact-form.cy.js**
Tests contact form validation:
- Empty form validation
- Email validation
- Required field validation
- Error message display
- Input error styling
- Valid form acceptance

### 5. **carousel.cy.js**
Tests image carousel functionality:
- Carousel controls visibility
- Image counter display
- Next/Previous image navigation
- Image wraparound behavior
- Car details display
- VIN number display

## Important Setup Notes

Before running tests, make sure:

1. **Server is running**: Tests need your website to be accessible at `http://localhost:5500`
   - You can run a local server:
     ```bash
     # Using Python 3
     python -m http.server 5500
     
     # Or using Node.js with http-server
     npm install -g http-server
     http-server . -p 5500
     ```

2. **Update `cypress.config.js`** if your server runs on a different port:
   ```javascript
   baseUrl: 'http://localhost:YOUR_PORT'
   ```

## Continuous Integration (CI)

To add these tests to your CI/CD pipeline (GitHub Actions, GitLab CI, etc.):

```yaml
- name: Run Cypress Tests
  run: npx cypress run
```

## Test Coverage

The current test suite covers:
- ✅ Mobile responsive behavior (hamburger menu)
- ✅ Navigation and scrolling
- ✅ Pagination functionality
- ✅ Form validation
- ✅ Carousel functionality
- ⚠️ Form submission (currently checks validation only, not actual API submission)

## Debugging Tests

1. **Use `cy.debug()`** in tests to pause execution
2. **Use `cy.pause()`** to step through tests manually
3. **Check video recordings** - Cypress saves videos of failed tests
4. **Use browser DevTools** - You can inspect elements while tests run

## Next Steps

Consider adding tests for:
- API responses for form submission (Web3Form integration)
- VIN number display in cards
- Responsive design at various breakpoints
- Performance metrics
- Accessibility compliance

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Selectors](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements)
