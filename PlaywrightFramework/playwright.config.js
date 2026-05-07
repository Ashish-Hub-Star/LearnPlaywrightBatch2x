/**
 * @fileoverview Main Playwright Configuration
 * This file controls how Playwright runs tests.
 * It defines browsers, parallel settings, reporters, and global options.
 * 
 * @see https://playwright.dev/docs/test-configuration
 */

const { defineConfig, devices } = require('@playwright/test');

// Load environment variables from .env file
require('dotenv').config();

/**
 * Playwright Test Configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
module.exports = defineConfig({
  // ==========================================
  // TEST SETTINGS
  // ==========================================
  
  // Directory where test files are located
  testDir: './tests',
  
  // Run files matching this pattern
  testMatch: '**/*.spec.js',
  
  // Maximum time one test can run (30 seconds)
  timeout: 30000,
  
  // Assertion timeout (5 seconds)
  expect: {
    timeout: 5000,
  },

  // ==========================================
  // PARALLEL EXECUTION
  // ==========================================
  
  // Run tests in parallel (recommended: workers = 4)
  // Set to 1 for sequential execution (debugging)
  workers: process.env.CI ? 1 : 4,
  
  // Fail fast: stop after first failure (set to 0 to disable)
  maxFailures: 0,

  // ==========================================
  // RETRY CONFIGURATION
  // ==========================================
  
  // Retry failed tests (0 for local, 2 for CI)
  retries: process.env.CI ? 2 : 0,

  // ==========================================
  // REPORTING
  // ==========================================
  
  reporter: [
    // HTML report with trace viewer
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    // Console list reporter
    ['list'],
    // JSON report for CI integration
    ['json', { outputFile: 'reports/test-results.json' }],
  ],

  // ==========================================
  // SHARED SETTINGS (Applied to all projects)
  // ==========================================
  
  use: {
    // Base URL for all navigation (e.g., page.goto('/login'))
    baseURL: process.env.BASE_URL || 'https://demoqa.com',
    
    // Run browser in headless mode (no UI)
    // Set to false to see the browser
    headless: true,
    
    // Browser viewport size (desktop default)
    viewport: { width: 1920, height: 1080 },
    
    // Ignore HTTPS errors (useful for self-signed certs)
    ignoreHTTPSErrors: true,
    
    // Capture screenshot on failure
    screenshot: 'only-on-failure',
    
    // Record video on failure (or 'on' for all tests)
    video: 'retain-on-failure',
    
    // Collect trace for debugging (shows clicks, network, console)
    trace: 'on-first-retry',
    
    // Action timeout (default wait for elements)
    actionTimeout: 15000,
    
    // Navigation timeout (page loads)
    navigationTimeout: 30000,
    
    // Context options (cookies, storage, etc.)
    contextOptions: {
      // Record all browser actions (for debugging)
      recordVideo: {
        dir: 'videos/',
        size: { width: 1920, height: 1080 },
      },
    },
    
    // Launch options (browser-specific)
    launchOptions: {
      // Slow down execution by N milliseconds (for debugging)
      slowMo: 0,
      // Run in maximized window
      args: ['--start-maximized'],
    },
  },

  // ==========================================
  // PROJECTS (Browser Configurations)
  // Run tests against multiple browsers
  // ==========================================
  
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Browser-specific settings
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    
    // Mobile configurations (optional)
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
      },
    },
  ],

  // ==========================================
  // GLOBAL SETUP / TEARDOWN
  // ==========================================
  
  // Runs once before all tests (e.g., database seeding)
  // globalSetup: require.resolve('./src/utils/global-setup'),
  
  // Runs once after all tests (e.g., cleanup)
  // globalTeardown: require.resolve('./src/utils/global-teardown'),

  // ==========================================
  // OUTPUT DIRECTORIES
  // ==========================================
  
  // Where to store test artifacts
  outputDir: 'test-results/',
});
