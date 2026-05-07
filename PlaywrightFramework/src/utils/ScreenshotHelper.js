/**
 * @fileoverview Screenshot Helper Utility
 * Provides methods for capturing screenshots during test execution.
 * Supports full page, element, and viewport screenshots.
 * 
 * @module src/utils/ScreenshotHelper
 */

const fs = require('fs');
const path = require('path');

// Default screenshot directory
const SCREENSHOT_DIR = process.env.SCREENSHOT_DIR || 'screenshots';

/**
 * Ensure the screenshot directory exists
 */
function ensureScreenshotDir() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
}

/**
 * Generate a unique filename for screenshots
 * Format: {testName}_{timestamp}_{type}.png
 * @param {string} testName - Name of the test
 * @param {string} type - Type of screenshot (fullpage, element, etc.)
 * @returns {string} Generated filename
 */
function generateFilename(testName, type = 'screenshot') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const sanitizedTestName = testName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
  return `${sanitizedTestName}_${type}_${timestamp}.png`;
}

/**
 * Capture a full page screenshot
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} testName - Name of the test for filename
 * @returns {Promise<string>} Path to the saved screenshot
 */
async function captureFullPage(page, testName) {
  ensureScreenshotDir();
  const filename = generateFilename(testName, 'fullpage');
  const filepath = path.join(SCREENSHOT_DIR, filename);
  
  await page.screenshot({
    path: filepath,
    fullPage: true,
  });
  
  console.log(`📸 Full page screenshot saved: ${filepath}`);
  return filepath;
}

/**
 * Capture a viewport screenshot (visible area only)
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} testName - Name of the test for filename
 * @returns {Promise<string>} Path to the saved screenshot
 */
async function captureViewport(page, testName) {
  ensureScreenshotDir();
  const filename = generateFilename(testName, 'viewport');
  const filepath = path.join(SCREENSHOT_DIR, filename);
  
  await page.screenshot({
    path: filepath,
    fullPage: false,
  });
  
  console.log(`📸 Viewport screenshot saved: ${filepath}`);
  return filepath;
}

/**
 * Capture a specific element screenshot
 * @param {import('@playwright/test').Locator} element - Playwright locator
 * @param {string} testName - Name of the test for filename
 * @param {string} elementName - Name/identifier of the element
 * @returns {Promise<string>} Path to the saved screenshot
 */
async function captureElement(element, testName, elementName) {
  ensureScreenshotDir();
  const filename = generateFilename(testName, `element_${elementName}`);
  const filepath = path.join(SCREENSHOT_DIR, filename);
  
  await element.screenshot({
    path: filepath,
  });
  
  console.log(`📸 Element screenshot saved: ${filepath}`);
  return filepath;
}

/**
 * Capture screenshot and attach to test report
 * Useful for Allure or custom reporters
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {import('@playwright/test').TestInfo} testInfo - Test info object
 * @param {string} [name] - Custom name for the screenshot
 * @returns {Promise<void>}
 */
async function attachScreenshotToReport(page, testInfo, name = 'screenshot') {
  const screenshot = await page.screenshot();
  await testInfo.attach(name, {
    body: screenshot,
    contentType: 'image/png',
  });
}

/**
 * Compare screenshots (Visual Regression Testing)
 * @param {Buffer} baseline - Baseline screenshot buffer
 * @param {Buffer} current - Current screenshot buffer
 * @returns {boolean} True if screenshots match
 */
function compareScreenshots(baseline, current) {
  // Note: For production use, consider libraries like pixelmatch or resemblejs
  if (baseline.length !== current.length) {
    return false;
  }
  return baseline.equals(current);
}

/**
 * Clean old screenshots (keep last N days)
 * @param {number} [daysToKeep=7] - Number of days to retain screenshots
 */
function cleanOldScreenshots(daysToKeep = 7) {
  if (!fs.existsSync(SCREENSHOT_DIR)) return;
  
  const files = fs.readdirSync(SCREENSHOT_DIR);
  const now = Date.now();
  const maxAge = daysToKeep * 24 * 60 * 60 * 1000;
  
  files.forEach(file => {
    const filePath = path.join(SCREENSHOT_DIR, file);
    const stats = fs.statSync(filePath);
    if (now - stats.mtime.getTime() > maxAge) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Deleted old screenshot: ${file}`);
    }
  });
}

module.exports = {
  captureFullPage,
  captureViewport,
  captureElement,
  attachScreenshotToReport,
  compareScreenshots,
  cleanOldScreenshots,
  generateFilename,
};
