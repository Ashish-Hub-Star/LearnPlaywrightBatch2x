/**
 * @fileoverview Base Page Class
 * Parent class for all page objects.
 * Contains common methods that every page needs.
 * All page objects should extend this class.
 * 
 * @class BasePage
 * @module src/pages/BasePage
 */

class BasePage {
  /**
   * Creates an instance of BasePage
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
  }

  // ==========================================
  // NAVIGATION METHODS
  // ==========================================

  /**
   * Navigate to a specific URL
   * @param {string} url - URL to navigate to
   * @returns {Promise<void>}
   */
  async navigateTo(url) {
    await this.page.goto(url);
  }

  /**
   * Navigate to a relative path (base URL is prepended)
   * @param {string} path - Relative path (e.g., '/login')
   * @returns {Promise<void>}
   */
  async navigateToPath(path) {
    await this.page.goto(path);
  }

  /**
   * Get current page URL
   * @returns {Promise<string>} Current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Get page title
   * @returns {Promise<string>} Page title
   */
  async getPageTitle() {
    return this.page.title();
  }

  // ==========================================
  // CLICK METHODS
  // ==========================================

  /**
   * Click on an element
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @param {Object} [options] - Click options
   * @returns {Promise<void>}
   */
  async click(selector, options = {}) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.click(options);
  }

  /**
   * Double click on an element
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @returns {Promise<void>}
   */
  async doubleClick(selector) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.dblclick();
  }

  /**
   * Right click on an element (context menu)
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @returns {Promise<void>}
   */
  async rightClick(selector) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.click({ button: 'right' });
  }

  /**
   * Click on element and wait for navigation
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @returns {Promise<void>}
   */
  async clickAndWaitForNavigation(selector) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await Promise.all([
      this.page.waitForNavigation(),
      element.click(),
    ]);
  }

  // ==========================================
  // INPUT METHODS
  // ==========================================

  /**
   * Fill an input field with text
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @param {string} text - Text to enter
   * @returns {Promise<void>}
   */
  async fill(selector, text) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.fill(text);
  }

  /**
   * Type text character by character (simulates keyboard typing)
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @param {string} text - Text to type
   * @param {Object} [options] - Type options (e.g., { delay: 100 })
   * @returns {Promise<void>}
   */
  async type(selector, text, options = {}) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.type(text, options);
  }

  /**
   * Clear an input field
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @returns {Promise<void>}
   */
  async clear(selector) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.fill('');
  }

  /**
   * Press a keyboard key
   * @param {string} key - Key to press (e.g., 'Enter', 'Tab', 'Escape')
   * @returns {Promise<void>}
   */
  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  // ==========================================
  // GET TEXT METHODS
  // ==========================================

  /**
   * Get text content of an element
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @returns {Promise<string|null>} Element text
   */
  async getText(selector) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return element.textContent();
  }

  /**
   * Get input value
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @returns {Promise<string|null>} Input value
   */
  async getInputValue(selector) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return element.inputValue();
  }

  /**
   * Get attribute value of an element
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @param {string} attribute - Attribute name
   * @returns {Promise<string|null>} Attribute value
   */
  async getAttribute(selector, attribute) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return element.getAttribute(attribute);
  }

  // ==========================================
  // WAIT METHODS
  // ==========================================

  /**
   * Wait for element to be visible
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @param {number} [timeout=10000] - Timeout in milliseconds
   * @returns {Promise<void>}
   */
  async waitForVisible(selector, timeout = 10000) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @param {number} [timeout=10000] - Timeout in milliseconds
   * @returns {Promise<void>}
   */
  async waitForHidden(selector, timeout = 10000) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for page to fully load
   * @param {string} [state='networkidle'] - Load state ('load', 'domcontentloaded', 'networkidle')
   * @returns {Promise<void>}
   */
  async waitForPageLoad(state = 'networkidle') {
    await this.page.waitForLoadState(state);
  }

  /**
   * Wait for URL to contain specific text
   * @param {string|RegExp} url - URL text or pattern to wait for
   * @returns {Promise<void>}
   */
  async waitForUrl(url) {
    await this.page.waitForURL(url);
  }

  /**
   * Wait for a specific time (use sparingly - prefer explicit waits)
   * @param {number} ms - Milliseconds to wait
   * @returns {Promise<void>}
   */
  async wait(ms) {
    await this.page.waitForTimeout(ms);
  }

  // ==========================================
  // VISIBILITY & STATE METHODS
  // ==========================================

  /**
   * Check if element is visible
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @returns {Promise<boolean>} True if visible
   */
  async isVisible(selector) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return element.isVisible();
  }

  /**
   * Check if element is enabled
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @returns {Promise<boolean>} True if enabled
   */
  async isEnabled(selector) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return element.isEnabled();
  }

  /**
   * Check if element is checked (checkbox/radio)
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @returns {Promise<boolean>} True if checked
   */
  async isChecked(selector) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return element.isChecked();
  }

  /**
   * Check if element exists in DOM (even if hidden)
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} True if element exists
   */
  async isElementPresent(selector) {
    const count = await this.page.locator(selector).count();
    return count > 0;
  }

  // ==========================================
  // SCROLLING METHODS
  // ==========================================

  /**
   * Scroll element into view
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @returns {Promise<void>}
   */
  async scrollToElement(selector) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Scroll to top of page
   * @returns {Promise<void>}
   */
  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  /**
   * Scroll to bottom of page
   * @returns {Promise<void>}
   */
  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  // ==========================================
  // SCREENSHOT METHODS
  // ==========================================

  /**
   * Take a full page screenshot
   * @param {string} filename - Screenshot filename
   * @returns {Promise<Buffer>} Screenshot buffer
   */
  async takeScreenshot(filename) {
    return this.page.screenshot({ path: `screenshots/${filename}.png`, fullPage: true });
  }

  /**
   * Take element screenshot
   * @param {string|import('@playwright/test').Locator} selector - Element selector or locator
   * @param {string} filename - Screenshot filename
   * @returns {Promise<Buffer>} Screenshot buffer
   */
  async takeElementScreenshot(selector, filename) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return element.screenshot({ path: `screenshots/${filename}.png` });
  }

  // ==========================================
  // DROPDOWN METHODS
  // ==========================================

  /**
   * Select option from dropdown by visible text
   * @param {string|import('@playwright/test').Locator} selector - Select element
   * @param {string} text - Visible text to select
   * @returns {Promise<void>}
   */
  async selectByText(selector, text) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.selectOption({ label: text });
  }

  /**
   * Select option from dropdown by value
   * @param {string|import('@playwright/test').Locator} selector - Select element
   * @param {string} value - Option value to select
   * @returns {Promise<void>}
   */
  async selectByValue(selector, value) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.selectOption(value);
  }

  // ==========================================
  // ALERT & DIALOG METHODS
  // ==========================================

  /**
   * Handle browser alert/confirm/prompt dialogs
   * @param {string} action - Action to take ('accept' or 'dismiss')
   * @param {string} [promptText] - Text to enter in prompt dialog
   * @returns {Promise<void>}
   */
  async handleDialog(action, promptText = '') {
    this.page.on('dialog', async (dialog) => {
      if (action === 'accept') {
        await dialog.accept(promptText);
      } else {
        await dialog.dismiss();
      }
    });
  }

  // ==========================================
  // FRAME HANDLING METHODS
  // ==========================================

  /**
   * Switch to iframe by selector
   * @param {string} selector - Iframe selector
   * @returns {Promise<import('@playwright/test').FrameLocator>} Frame locator
   */
  async switchToFrame(selector) {
    return this.page.frameLocator(selector);
  }

  /**
   * Switch to main page from iframe
   * (In Playwright, you simply use page methods directly)
   * This method is for conceptual clarity
   * @returns {import('@playwright/test').Page}
   */
  switchToMainPage() {
    return this.page;
  }

  // ==========================================
  // BROWSER ACTION METHODS
  // ==========================================

  /**
   * Refresh/reload the current page
   * @returns {Promise<void>}
   */
  async refreshPage() {
    await this.page.reload();
  }

  /**
   * Go back in browser history
   * @returns {Promise<void>}
   */
  async goBack() {
    await this.page.goBack();
  }

  /**
   * Go forward in browser history
   * @returns {Promise<void>}
   */
  async goForward() {
    await this.page.goForward();
  }

  /**
   * Accept cookies if banner is present
   * @param {string} acceptButtonSelector - Cookie accept button selector
   * @returns {Promise<void>}
   */
  async acceptCookies(acceptButtonSelector) {
    try {
      const button = this.page.locator(acceptButtonSelector);
      if (await button.isVisible({ timeout: 5000 })) {
        await button.click();
      }
    } catch (error) {
      // Cookie banner not present, continue
    }
  }
}

module.exports = BasePage;
