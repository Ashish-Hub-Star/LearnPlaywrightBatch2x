# Playwright Learning Framework - Execution Flow

This document explains the complete execution flow of the framework to help you understand how everything connects.

## 📊 Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        TEST EXECUTION START                      │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: CONFIGURATION LOADING                                   │
│  File: playwright.config.js                                      │
│                                                                  │
│  • Loads environment variables from .env                         │
│  • Sets up browser projects (Chromium, Firefox, WebKit)          │
│  • Configures parallel workers (default: 4)                      │
│  • Defines screenshot/video/report settings                      │
│  • Sets base URL and timeouts                                    │
│  • Loads custom fixtures                                         │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: FIXTURES INITIALIZATION                                 │
│  File: src/fixtures/testFixtures.js                              │
│                                                                  │
│  • Extends Playwright's built-in test fixture                    │
│  • Creates BrowserContext with specific settings                 │
│  • Initializes Page Object instances                             │
│  • Sets up auto-screenshot on failure                            │
│  • Handles authentication state if needed                        │
│  • Cleanup runs after test completion                            │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: TEST FILE EXECUTION                                     │
│  File: tests/ui/login.spec.js (example)                          │
│                                                                  │
│  • BeforeEach hook runs (navigation, setup)                      │
│  • Test steps execute sequentially                               │
│  • Uses Page Objects for actions                                 │
│  • Uses Utils for screenshots/logging                            │
│  • Assertions verify expected results                            │
│  • AfterEach hook runs (cleanup, screenshot on fail)             │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: PAGE OBJECT ACTIONS                                     │
│  File: src/pages/LoginPage.js (example)                          │
│                                                                  │
│  • Inherits from BasePage (common methods)                       │
│  • Contains locators (@FindBy equivalent)                        │
│  • Wraps Playwright actions in semantic methods                  │
│  • Returns page objects for method chaining                      │
│  • Handles waits and synchronization                             │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 5: UTILITIES EXECUTION                                     │
│  Files: Logger.js, ScreenshotHelper.js, Helpers.js               │
│                                                                  │
│  • Logger: Captures execution details                            │
│  • ScreenshotHelper: Captures visual evidence                    │
│  • Helpers: Data manipulation, formatting                        │
│  • Environment: Reads config based on env                        │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 6: REPORTING & OUTPUT                                      │
│  Files: playwright-report/, reports/, screenshots/               │
│                                                                  │
│  • HTML Report generated with traces                             │
│  • Screenshots attached to failed tests                          │
│  • Videos recorded for debugging                                 │
│  • Logs available for analysis                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Detailed Component Interaction

### 1. playwright.config.js
```
Configuration
├── Projects
│   ├── Chromium (Desktop Chrome)
│   ├── Firefox (Desktop Firefox)
│   └── WebKit (Desktop Safari)
├── Workers (Parallelism)
├── Reporters (HTML, List, JSON)
├── Use Options
│   ├── Base URL
│   ├── Headless/Headed
│   ├── Screenshot settings
│   ├── Video recording
│   └── Trace collection
└── Global Setup/Teardown (optional)
```

### 2. testFixtures.js
```
Custom Fixtures
├── page (extended from test.page)
│   └── Already navigated to base URL
├── loginPage
│   └── Instance of LoginPage with page injected
├── homePage
│   └── Instance of HomePage with page injected
├── logger
│   └── Winston logger instance
└── screenshotHelper
    └── Screenshot utility instance
```

### 3. BasePage.js
```
BasePage (Abstract Parent)
├── Common Actions
│   ├── click(element)
│   ├── fill(element, text)
│   ├── getText(element)
│   ├── waitForElement(element)
│   ├── isVisible(element)
│   └── takeScreenshot(name)
├── Common Waits
│   ├── waitForLoadState()
│   ├── waitForURL()
│   └── waitForTimeout()
└── Common Assertions Helpers
    ├── expectToBeVisible()
    └── expectToHaveText()
```

### 4. LoginPage.js (extends BasePage)
```
LoginPage
├── Locators
│   ├── usernameInput
│   ├── passwordInput
│   ├── loginButton
│   └── errorMessage
├── Actions
│   ├── navigateToLogin()
│   ├── enterUsername(text)
│   ├── enterPassword(text)
│   ├── clickLogin()
│   └── login(username, password) [combined]
└── Validations
    ├── isErrorMessageVisible()
    └── getErrorMessageText()
```

## 📋 Test Execution Sequence (Example)

```javascript
// tests/ui/login.spec.js
test.describe('Login Feature', () => {
  
  // 1. BEFORE EACH: Runs before every test
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  // 2. TEST EXECUTION
  test('user can login with valid credentials @smoke', async ({ loginPage }) => {
    // 2a. Action: Enter username
    await loginPage.enterUsername('testuser');
    
    // 2b. Action: Enter password
    await loginPage.enterPassword('password123');
    
    // 2c. Action: Click login
    await loginPage.clickLogin();
    
    // 2d. Assertion: Verify success
    await expect(page).toHaveURL('/dashboard');
  });

  // 3. AFTER EACH: Runs after every test (defined in fixtures)
  //    - Takes screenshot if test failed
  //    - Closes context
  //    - Writes logs
});
```

## 🎯 Data Flow

```
Test Data (testData.js)
    │
    ├── Credentials
    │   └── { username: 'test', password: 'pass' }
    │
    ├── URLs
    │   └── { login: '/login', home: '/home' }
    │
    └── Test Inputs
        └── { searchTerm: 'Playwright' }

    ↓ Injected into

Test Files
    ↓ Used by

Page Objects
    ↓ Interact with

Application Under Test
```

## 🌐 Environment Flow

```
Development (.env.development)
├── BASE_URL=https://dev.example.com
└── API_URL=https://api-dev.example.com

Staging (.env.staging)
├── BASE_URL=https://staging.example.com
└── API_URL=https://api-staging.example.com

Production (.env.production)
├── BASE_URL=https://example.com
└── API_URL=https://api.example.com
```

Switch environments:
```bash
# Windows
set NODE_ENV=staging && npx playwright test

# Mac/Linux
NODE_ENV=staging npx playwright test
```

## 🔧 Debugging Flow

```
Test Fails
    │
    ├── 1. Check Console Output
    │   └── Error message and stack trace
    │
    ├── 2. Check HTML Report
    │   └── npx playwright show-report
    │   └── View trace, screenshot, video
    │
    ├── 3. Check Logs
    │   └── reports/test-execution.log
    │
    ├── 4. Run in Debug Mode
    │   └── npx playwright test --debug
    │
    └── 5. Run in UI Mode
        └── npx playwright test --ui
```

## 📈 CI/CD Flow (GitHub Actions)

```
Push Code to GitHub
    │
    ├── Trigger: .github/workflows/playwright.yml
    │
    ├── Jobs:
    │   ├── 1. Checkout code
    │   ├── 2. Setup Node.js
    │   ├── 3. Install dependencies
    │   ├── 4. Install Playwright browsers
    │   ├── 5. Run tests
    │   └── 6. Upload artifacts (reports, screenshots)
    │
    └── Results: View in GitHub Actions tab
```

## 🎓 Learning Checklist

- [ ] Understand `playwright.config.js` settings
- [ ] Create a Page Object class extending BasePage
- [ ] Write a test using custom fixtures
- [ ] Use logger in a test
- [ ] Capture a screenshot manually
- [ ] Run tests in parallel
- [ ] Filter tests by tag
- [ ] View and analyze HTML report
- [ ] Run tests in CI/CD
- [ ] Add new utility function

## 📚 Next Steps

1. Read `src/pages/BasePage.js` to understand common actions
2. Study `tests/ui/login.spec.js` for test structure
3. Experiment with `playwright.config.js` settings
4. Add your own page objects and tests
5. Customize utilities for your needs

---

**Remember:** This framework is designed for learning. Experiment, break things, and learn from the errors! 🚀
