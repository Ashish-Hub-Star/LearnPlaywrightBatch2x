/**
 * @fileoverview Custom Test Fixtures
 * Extends Playwright's built-in test fixtures to inject page objects and utilities.
 * Fixtures provide automatic setup and teardown for each test.
 * 
 * @module src/fixtures/testFixtures
 */

const { test: base, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const { logger, logTestStart, logTestEnd } = require('../utils/Logger');
const ScreenshotHelper = require('../utils/ScreenshotHelper');
const Environment = require('../utils/Environment');

/**
 * Extended test fixtures
 * These fixtures are available in all tests that import from this file
 */
const test = base.extend({
  
  // ==========================================
  // PAGE OBJECT FIXTURES
  // ==========================================
  
  /**
   * Login page object fixture
   * Automatically creates LoginPage instance for each test
   * Usage in test: async ({ loginPage }) => { ... }
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  /**
   * Home page object fixture
   * Automatically creates HomePage instance for each test
   * Usage in test: async ({ homePage }) => { ... }
   */
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  
  // ==========================================
  // UTILITY FIXTURES
  // ==========================================
  
  /**
   * Logger instance fixture
   * Provides Winston logger for test logging
   * Usage in test: async ({ logger }) => { logger.info('message'); }
   */
  logger: async ({}, use) => {
    await use(logger);
  },
  
  /**
   * Screenshot helper fixture
   * Provides screenshot utility methods
   * Usage in test: async ({ screenshotHelper }) => { ... }
   */
  screenshotHelper: async ({ page }, use) => {
    await use(ScreenshotHelper);
  },
  
  // ==========================================
  // CONTEXT FIXTURE (Auto-authentication)
  // ==========================================
  
  /**
   * Context with authentication state
   * Saves and reuses login state across tests
   * Uncomment to use persistent authentication
   */
  // context: async ({ browser }, use) => {
  //   const context = await browser.newContext({
  //     storageState: 'auth.json', // Load saved auth state
  //   });
  //   await use(context);
  //   await context.close();
  // },
  
  // ==========================================
  // AUTO-SCREENSHOT ON FAILURE
  // ==========================================
  
  /**
   * Automatic screenshot capture on test failure
   * This fixture runs after each test and captures screenshot if test failed
   */
  autoScreenshot: [async ({ page }, use, testInfo) => {
    await use();
    
    // After test runs, check if it failed
    if (testInfo.status !== testInfo.expectedStatus) {
      // Capture screenshot with test name
      const screenshotPath = `screenshots/failure-${testInfo.title.replace(/[^a-zA-Z0-9]/g, '_')}-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`📸 Failure screenshot saved: ${screenshotPath}`);
      
      // Attach screenshot to HTML report
      await testInfo.attach('Failure Screenshot', {
        path: screenshotPath,
        contentType: 'image/png',
      });
    }
  }, { auto: true }], // auto: true means this fixture runs automatically without being referenced
  
  // ==========================================
  // TEST LIFECYCLE LOGGING
  // ==========================================
  
  /**
   * Automatic test logging
   * Logs test start and end with timing
   */
  testLogger: [async ({}, use, testInfo) => {
    const startTime = Date.now();
    
    // Log test start
    logTestStart(testInfo.title, testInfo.project.name);
    
    await use();
    
    // Log test end
    const duration = Date.now() - startTime;
    const status = testInfo.status === 'passed' ? 'PASSED' : 'FAILED';
    logTestEnd(testInfo.title, status, duration);
  }, { auto: true }],
});

/**
 * Export extended test and expect
 * Import these in your test files instead of @playwright/test
 */
module.exports = { test, expect };
