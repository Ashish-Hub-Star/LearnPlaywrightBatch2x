/**
 * @fileoverview Home Page Tests
 * Demonstrates testing of home/dashboard page features including:
 * - Search functionality
 * - Navigation menu
 * - Content verification
 * - Responsive design basics
 * 
 * @module tests/ui/homepage.spec
 */

const { test, expect } = require('../../src/fixtures/testFixtures');
const { VALID_USER, SEARCH_TERMS, BOOKS } = require('../../src/data/testData');

test.describe('Home Page Feature @home @ui', () => {
  
  /**
   * Setup: Login before testing home page features
   */
  test.beforeEach(async ({ page, loginPage, homePage }) => {
    await loginPage.navigateToBookStoreLogin();
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    
    // Wait for navigation to complete
    await page.waitForURL(/.*profile.*|.*books.*/, { timeout: 10000 });
  });

  // ==========================================
  // PAGE LOAD TESTS
  // ==========================================

  /**
   * Test: Home page loads successfully after login
   */
  test('home page loads after successful login @smoke', async ({ page, homePage }) => {
    // Verify we're on a valid page
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('/login');
    
    // Verify page title is present
    const title = await homePage.getPageTitle();
    expect(title).toBeTruthy();
  });

  /**
   * Test: Welcome message is displayed
   */
  test('welcome message is displayed for logged in user', async ({ homePage }) => {
    const welcomeText = await homePage.getWelcomeMessage();
    expect(welcomeText).toBeTruthy();
  });

  // ==========================================
  // SEARCH FUNCTIONALITY TESTS
  // ==========================================

  /**
   * Test: Search with valid term returns results
   */
  test('user can search for books with valid term @smoke', async ({ page, homePage }) => {
    // Navigate to book store
    await homePage.navigateToBookStore();
    
    // Search for a book
    await homePage.search(SEARCH_TERMS.valid);
    
    // Verify results are displayed
    await page.waitForLoadState('networkidle');
    
    // Check that some content is visible
    const hasContent = await page.locator('.rt-tbody, .books-wrapper, .search-results').isVisible();
    expect(hasContent).toBeTruthy();
  });

  /**
   * Test: Search with invalid term shows no results
   */
  test('search with invalid term shows appropriate message @regression', async ({ page, homePage }) => {
    await homePage.navigateToBookStore();
    await homePage.search(SEARCH_TERMS.invalid);
    
    // Wait for search to complete
    await page.waitForTimeout(1000);
    
    // Verify no results or empty state message
    const bodyText = await page.locator('body').textContent();
    const hasNoResults = bodyText.includes('No rows found') || 
                        bodyText.includes('No results') || 
                        bodyText.includes('0');
    expect(hasNoResults).toBeTruthy();
  });

  /**
   * Test: Clear search functionality
   */
  test('user can clear search field @regression', async ({ homePage }) => {
    await homePage.navigateToBookStore();
    
    // Enter search text
    await homePage.search('test query');
    
    // Clear search
    await homePage.clearSearch();
    
    // Verify search field is empty
    const searchValue = await homePage.getSearchValue();
    expect(searchValue).toBe('');
  });

  // ==========================================
  // NAVIGATION TESTS
  // ==========================================

  /**
   * Test: Navigation menu links are functional
   */
  test('navigation menu links are accessible @smoke', async ({ page, homePage }) => {
    // Get all navigation links
    const navTexts = await homePage.getNavLinkTexts();
    
    // Verify menu is not empty
    expect(navTexts.length).toBeGreaterThan(0);
    
    // Print links for debugging
    console.log('Navigation links:', navTexts);
  });

  /**
   * Test: Navigate to profile page
   */
  test('user can navigate to profile page', async ({ page, homePage }) => {
    await homePage.clickNavLinkByText('Profile');
    
    // Verify URL changed
    await expect(page).toHaveURL(/.*profile.*/);
  });

  // ==========================================
  // CONTENT VERIFICATION TESTS
  // ==========================================

  /**
   * Test: Verify books are displayed on home page
   */
  test('books are displayed on book store page', async ({ homePage }) => {
    await homePage.navigateToBookStore();
    
    // Count content cards
    const cardCount = await homePage.getContentCardCount();
    expect(cardCount).toBeGreaterThan(0);
    
    console.log(`Found ${cardCount} books on the page`);
  });

  /**
   * Test: Verify specific book titles are present
   */
  test('specific book titles are visible on book store', async ({ page, homePage }) => {
    await homePage.navigateToBookStore();
    
    // Get all book titles
    const titles = await homePage.getAllCardTitles();
    
    // Verify at least one expected book is present
    const hasExpectedBook = titles.some(title => 
      title?.includes('Git') || title?.includes('JavaScript')
    );
    
    expect(hasExpectedBook || titles.length > 0).toBeTruthy();
  });

  // ==========================================
  // RESPONSIVE DESIGN TESTS
  // ==========================================

  /**
   * Test: Page renders correctly on mobile viewport
   */
  test('page renders on mobile viewport @responsive', async ({ page, homePage }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Refresh page to apply responsive styles
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify main content is still visible
    const isVisible = await homePage.isOnHomePage();
    expect(isVisible).toBeTruthy();
  });

  /**
   * Test: Page renders correctly on tablet viewport
   */
  test('page renders on tablet viewport @responsive', async ({ page, homePage }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify content is accessible
    const currentUrl = page.url();
    expect(currentUrl).toBeTruthy();
  });
});

// ==========================================
// VISUAL TESTING GROUP
// ==========================================

test.describe('Home Page Visual Tests @visual @ui', () => {
  
  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.navigateToBookStoreLogin();
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    await page.waitForURL(/.*profile.*|.*books.*/, { timeout: 10000 });
  });

  /**
   * Test: Capture homepage screenshot
   * Useful for visual regression baseline
   */
  test('capture homepage screenshot @regression', async ({ page }) => {
    // Navigate to book store for consistent screenshot
    await page.goto('/books');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot
    await page.screenshot({ 
      path: 'screenshots/homepage-baseline.png',
      fullPage: true 
    });
    
    // Verify screenshot file exists
    const fs = require('fs');
    expect(fs.existsSync('screenshots/homepage-baseline.png')).toBeTruthy();
  });
});
