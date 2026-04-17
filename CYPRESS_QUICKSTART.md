# Quick Start: Running Your First Test

## Step 1: Install Node.js (if not already installed)
Download and install from: https://nodejs.org/

## Step 2: Install Cypress
Open terminal/command prompt in the project directory and run:
```bash
npm install --save-dev cypress
```

## Step 3: Start Your Local Server
In a NEW terminal window, run one of the following:

**Option A - Using Python 3 (if installed):**
```bash
python -m http.server 5500
```

**Option B - Using Node.js http-server:**
```bash
npm install -g http-server
http-server . -p 5500
```

**Option C - Using VS Code Live Server:**
Right-click on `index.html` → "Open with Live Server"
(Then update `baseUrl` in `cypress.config.js` to match the port)

## Step 4: Run the Tests

### Interactive Mode (Recommended for first time):
```bash
npm run cypress:open
```
This opens the Cypress GUI where you can:
- Click on any test file to run it
- Watch tests execute in real-time
- See exactly what's being tested

### Headless Mode (All tests at once):
```bash
npm run cypress:run
```

## Test Files to Try

Start with these tests in order:

1. **hamburger-menu.cy.js** - Tests mobile menu (375px viewport)
2. **navigation.cy.js** - Tests page navigation
3. **pagination.cy.js** - Tests the gallery page numbering (1, 2, 3)
4. **carousel.cy.js** - Tests image carousel on each car
5. **contact-form.cy.js** - Tests form validation

## Troubleshooting

**Tests fail with connection error:**
- Make sure your local server is running on port 5500
- Check the terminal where you started the server

**Hamburger menu tests fail:**
- Make sure you're viewing in mobile mode (375px)
- Hamburger only appears on mobile

**Page 3 pagination test fails:**
- This test specifically verifies page 3 doesn't go to Contact section
- If it fails, the pagination click handling needs fixing

## Next Steps

After running the tests:
1. Look at the test output to see what passed/failed
2. Check `TESTING.md` for detailed test documentation
3. Modify tests if you change the HTML/CSS
4. Add more tests for new features

## Need Help?

- Check the console output for error messages
- Review the video recordings Cypress creates for failed tests
- Read: https://docs.cypress.io/guides/getting-started/opening-the-app
