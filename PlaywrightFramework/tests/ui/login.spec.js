/**
 * @fileoverview Login Feature Tests
 * Demonstrates various testing patterns including:
 * - Page Object Model usage
 * - Positive and negative test cases
 * - Assertions with Playwright
 * - Tagging (@smoke, @regression)
 * - Data-driven testing
 * 
 * @module tests/ui/login.spec
 */

const { test, expect } = require('../../src/fixtures/testFixtures');
const { VALID_USER, INVALID_USER, ERROR_MESSAGES, TEST_USERS } = require('../../src/data/testData');

// ==========================================
// TEST GROUP: Login Feature
// ==========================================

test.describe('Login Feature @login @ui', () => {
  
  /**
   * BeforeEach hook: Runs before every test in this group
   * Navigates to login page
   */
  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.navigateToBookStoreLogin();
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  /**
   * AfterEach hook: Runs after every test
   * Can be used for cleanup, but we use auto-screenshot fixture instead
   */
  test.afterEach(async ({ page }) => {
    // Optional: Clear cookies/storage between tests
    // await page.context().clearCookies();
  });

  // ==========================================
  // POSITIVE TEST CASES
  // ==========================================

  /**
   * Test: Successful login with valid credentials
   * Tags: @smoke - Critical path test, runs in CI
   */
  test('user can login with valid credentials @smoke', async ({ page, loginPage }) => {
    // Step 1: Enter username
    await loginPage.enterUsername(VALID_USER.username);
    
    // Step 2: Enter password
    await loginPage.enterPassword(VALID_USER.password);
    
    // Step 3: Click login button
    await loginPage.clickLogin();
    
    // Assertion: Verify user is redirected to profile/books page
    // Playwright auto-waits for URL change
    await expect(page).toHaveURL(/.*profile.*|.*books.*/);
    
    // Additional assertion: Check welcome message or username display
    const userNameValue = page.locator('#userName-value');
    await expect(userNameValue).toBeVisible();
  });

  /**
   * Test: Login with method chaining
   * Demonstrates alternative syntax using chained methods
   */
  test('user can login using method chaining @smoke', async ({ page, loginPage }) => {
    // Using fluent/chaining style (methods return 'this')
    await loginPage
      .enterUsername(VALID_USER.username)
      .then(() => loginPage.enterPassword(VALID_USER.password))
      .then(() => loginPage.clickLogin());
    
    // Verify successful login
    await expect(page).toHaveURL(/.*profile.*/);
  });

  /**
   * Test: Combined login method
   * Uses single method that performs all login steps
   */
  test('user can login with combined login method', async ({ page, loginPage }) => {
    // Single method call for entire login flow
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    
    // Verify login success
    await expect(page).toHaveURL(/.*profile.*/);
  });

  // ==========================================
  // NEGATIVE TEST CASES
  // ==========================================

  /**
   * Test: Login with invalid username
   * Verifies error handling for invalid credentials
   */
  test('user cannot login with invalid username @regression', async ({ loginPage }) => {
    await loginPage.login(INVALID_USER.username, INVALID_USER.password);
    
    // Verify error message is displayed
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
    
    // Verify specific error text
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Invalid');
  });

  /**
   * Test: Login with invalid password
   */
  test('user cannot login with invalid password @regression', async ({ loginPage }) => {
    await loginPage.login(VALID_USER.username, INVALID_USER.password);
    
    // Wait for and verify error message
    await expect(loginPage.errorMessage).toBeVisible();
    
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Invalid');
  });

  /**
   * Test: Login with empty credentials
   * Verifies validation when fields are empty
   */
  test('user cannot login with empty credentials @regression', async ({ loginPage }) => {
    // Click login without entering anything
    await loginPage.clickLogin();
    
    // Verify we're still on login page (no redirect)
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain('/login');
  });

  /**
   * Test: Login with empty password
   */
  test('user cannot login with empty password @regression', async ({ loginPage }) => {
    await loginPage.enterUsername(VALID_USER.username);
    await loginPage.clickLogin();
    
    // Should remain on login page
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain('/login');
  });

  // ==========================================
  // DATA-DRIVEN TESTING
  // ==========================================

  /**
   * Test: Multiple user login scenarios
   * Runs the same test with different data sets
   */
  for (const user of TEST_USERS) {
    test(`login attempt with user: ${user.description} @regression`, async ({ loginPage }) => {
      await loginPage.login(user.username, user.password);
      
      // For demo purposes, we just verify the form was filled
      const formValues = await loginPage.getFormValues();
      expect(formValues.username).toBe(user.username);
      expect(formValues.password).toBe(user.password);
    });
  }

  // ==========================================
  // UI/UX TEST CASES
  // ==========================================

  /**
   * Test: Verify login page elements are visible
   * Checks that all important elements are rendered correctly
   */
  test('login page displays all required elements @smoke', async ({ loginPage }) => {
    // Verify username field is visible and enabled
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.usernameInput).toBeEnabled();
    
    // Verify password field is visible and enabled
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeEnabled();
    
    // Verify login button is visible and enabled
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
    
    // Verify heading is present
    const heading = await loginPage.getPageHeading();
    expect(heading).toBeTruthy();
  });

  /**
   * Test: Password field type is password (masked)
   */
  test('password field masks input @regression', async ({ loginPage }) => {
    const passwordType = await loginPage.getAttribute(loginPage.passwordInput, 'type');
    expect(passwordType).toBe('password');
  });

  /**
   * Test: Login page title verification
   */
  test('login page has correct title', async ({ loginPage }) => {
    const title = await loginPage.getPageTitle();
    expect(title).toContain('Login');
  });
});

// ==========================================
// ADDITIONAL TEST GROUP: Logout Feature
// ==========================================

test.describe('Logout Feature @logout @ui', () => {
  
  test.beforeEach(async ({ page, loginPage }) => {
    // Login before each test
    await loginPage.navigateToBookStoreLogin();
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    
    // Wait for redirect to profile/books page
    await page.waitForURL(/.*profile.*|.*books.*/, { timeout: 10000 });
  });

  /**
   * Test: User can logout successfully
   */
  test('user can logout successfully @smoke', async ({ page, homePage }) => {
    // Click logout
    await homePage.logout();
    
    // Verify redirect to login page
    await expect(page).toHaveURL(/.*login.*/);
  });

  /**
   * Test: After logout, user cannot access protected pages
   */
  test('logged out user is redirected when accessing protected pages @regression', async ({ page, homePage }) => {
    // Logout first
    await homePage.logout();
    
    // Try to access profile page directly
    await page.goto('/profile');
    
    // Should be redirected to login
    await expect(page).toHaveURL(/.*login.*/);
  });
});
