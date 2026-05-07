/**
 * @fileoverview Login Page Object
 * Encapsulates all elements and actions related to the login page.
 * Demonstrates Page Object Model pattern with clear separation of locators and actions.
 * 
 * @class LoginPage
 * @extends BasePage
 * @module src/pages/LoginPage
 */

const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  /**
   * Creates an instance of LoginPage
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page); // Call parent constructor
    
    // ==========================================
    // LOCATORS - Define all page elements here
    // Using getter methods for lazy evaluation
    // ==========================================
    
    /** Page heading/title */
    this.pageHeading = page.locator('h1, h2, .heading');
    
    /** Username input field */
    this.usernameInput = page.locator('#userName, [data-testid="username"], input[name="username"]');
    
    /** Password input field */
    this.passwordInput = page.locator('#password, [data-testid="password"], input[name="password"]');
    
    /** Login button */
    this.loginButton = page.locator('#login, [data-testid="login-button"], button[type="submit"]');
    
    /** Error message container */
    this.errorMessage = page.locator('#name, .error-message, .alert-danger');
    
    /** Remember me checkbox */
    this.rememberMeCheckbox = page.locator('#rememberMe, [data-testid="remember-me"]');
    
    /** Forgot password link */
    this.forgotPasswordLink = page.locator('a[href*="forgot"], .forgot-password');
    
    /** Register/Sign up link */
    this.registerLink = page.locator('a[href*="register"], .register-link');
    
    /** Logout button (visible after login) */
    this.logoutButton = page.locator('#submit, [data-testid="logout"], button:has-text("Log out")');
  }

  // ==========================================
  // NAVIGATION METHODS
  // ==========================================

  /**
   * Navigate to login page
   * @returns {Promise<void>}
   */
  async navigateToLogin() {
    await this.navigateToPath('/login');
  }

  /**
   * Navigate to Book Store Application login (demoqa specific)
   * @returns {Promise<void>}
   */
  async navigateToBookStoreLogin() {
    await this.navigateToPath('/login');
  }

  // ==========================================
  // ACTION METHODS
  // ==========================================

  /**
   * Enter username in the username field
   * @param {string} username - Username to enter
   * @returns {Promise<LoginPage>} Returns this for method chaining
   */
  async enterUsername(username) {
    await this.usernameInput.fill(username);
    return this; // Method chaining support
  }

  /**
   * Enter password in the password field
   * @param {string} password - Password to enter
   * @returns {Promise<LoginPage>} Returns this for method chaining
   */
  async enterPassword(password) {
    await this.passwordInput.fill(password);
    return this; // Method chaining support
  }

  /**
   * Click the login button
   * @returns {Promise<void>}
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Complete login action with username and password
   * This is a composite method that combines multiple actions
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise<void>}
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Login using method chaining
   * Example: await loginPage.fillUsername('user').fillPassword('pass').submit();
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise<void>}
   */
  async loginWithChaining(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Click forgot password link
   * @returns {Promise<void>}
   */
  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  /**
   * Click register/sign up link
   * @returns {Promise<void>}
   */
  async clickRegister() {
    await this.registerLink.click();
  }

  /**
   * Toggle remember me checkbox
   * @param {boolean} [check=true] - True to check, false to uncheck
   * @returns {Promise<void>}
   */
  async toggleRememberMe(check = true) {
    const isChecked = await this.rememberMeCheckbox.isChecked();
    if (isChecked !== check) {
      await this.rememberMeCheckbox.click();
    }
  }

  /**
   * Click logout button
   * @returns {Promise<void>}
   */
  async clickLogout() {
    await this.logoutButton.click();
  }

  // ==========================================
  // VALIDATION / GETTER METHODS
  // ==========================================

  /**
   * Check if error message is visible
   * @returns {Promise<boolean>} True if error is displayed
   */
  async isErrorMessageVisible() {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get error message text
   * @returns {Promise<string|null>} Error message text
   */
  async getErrorMessageText() {
    return this.errorMessage.textContent();
  }

  /**
   * Get page heading text
   * @returns {Promise<string|null>} Heading text
   */
  async getPageHeading() {
    return this.pageHeading.textContent();
  }

  /**
   * Check if login button is enabled
   * @returns {Promise<boolean>} True if enabled
   */
  async isLoginButtonEnabled() {
    return this.loginButton.isEnabled();
  }

  /**
   * Check if user is logged in (logout button visible)
   * @returns {Promise<boolean>} True if logged in
   */
  async isLoggedIn() {
    return this.logoutButton.isVisible();
  }

  /**
   * Wait for login to complete (redirect to home/dashboard)
   * @param {string|RegExp} [expectedUrl=/dashboard|home|profile/] - Expected URL pattern
   * @param {number} [timeout=10000] - Timeout in milliseconds
   * @returns {Promise<void>}
   */
  async waitForLoginCompletion(expectedUrl = /dashboard|home|profile|books/, timeout = 10000) {
    await this.page.waitForURL(expectedUrl, { timeout });
  }

  /**
   * Clear all input fields on the login form
   * @returns {Promise<void>}
   */
  async clearForm() {
    await this.usernameInput.fill('');
    await this.passwordInput.fill('');
  }

  /**
   * Get all form field values as an object
   * @returns {Promise<Object>} Object with username and password values
   */
  async getFormValues() {
    return {
      username: await this.usernameInput.inputValue(),
      password: await this.passwordInput.inputValue(),
    };
  }
}

module.exports = LoginPage;
