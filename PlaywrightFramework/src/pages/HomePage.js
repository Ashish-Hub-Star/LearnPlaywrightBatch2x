/**
 * @fileoverview Home Page Object
 * Encapsulates all elements and actions related to the home/dashboard page.
 * Demonstrates Page Object Model pattern for post-login pages.
 * 
 * @class HomePage
 * @extends BasePage
 * @module src/pages/HomePage
 */

const BasePage = require('./BasePage');

class HomePage extends BasePage {
  /**
   * Creates an instance of HomePage
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);

    // ==========================================
    // LOCATORS - Home page elements
    // ==========================================
    
    /** Welcome message / user greeting */
    this.welcomeMessage = page.locator('.welcome-message, .user-name, #userName-value');
    
    /** Navigation menu items */
    this.navMenu = page.locator('.navbar, .main-nav, nav');
    this.navLinks = page.locator('.nav-link, .menu-item, nav a');
    
    /** Search input (if present on home page) */
    this.searchInput = page.locator('input[type="search"], #searchBox, [placeholder*="search" i]');
    
    /** Search button */
    this.searchButton = page.locator('button[type="submit"], .search-button, #basic-addon2');
    
    /** Cards/items displayed on home page */
    this.contentCards = page.locator('.card, .item, .product');
    
    /** Profile/settings button */
    this.profileButton = page.locator('.profile-btn, [data-testid="profile"], .user-menu');
    
    /** Logout button */
    this.logoutButton = page.locator('#submit, .logout, button:has-text("Log out")');
    
    /** Footer section */
    this.footer = page.locator('footer, .footer');
    
    /** Banner/hero section */
    this.heroBanner = page.locator('.hero, .banner, .jumbotron');
  }

  // ==========================================
  // NAVIGATION METHODS
  // ==========================================

  /**
   * Navigate to home page
   * @returns {Promise<void>}
   */
  async navigateToHome() {
    await this.navigateToPath('/');
  }

  /**
   * Navigate to Book Store (demoqa specific)
   * @returns {Promise<void>}
   */
  async navigateToBookStore() {
    await this.navigateToPath('/books');
  }

  // ==========================================
  // SEARCH METHODS
  // ==========================================

  /**
   * Perform a search on the home page
   * @param {string} searchTerm - Term to search for
   * @returns {Promise<void>}
   */
  async search(searchTerm) {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
  }

  /**
   * Get search input value
   * @returns {Promise<string|null>} Current search text
   */
  async getSearchValue() {
    return this.searchInput.inputValue();
  }

  /**
   * Clear search field
   * @returns {Promise<void>}
   */
  async clearSearch() {
    await this.searchInput.fill('');
  }

  // ==========================================
  // NAVIGATION MENU METHODS
  // ==========================================

  /**
   * Click a navigation link by text
   * @param {string} linkText - Text of the link to click
   * @returns {Promise<void>}
   */
  async clickNavLinkByText(linkText) {
    const link = this.page.locator(`.nav-link:has-text("${linkText}"), a:has-text("${linkText}")`);
    await link.click();
  }

  /**
   * Get all navigation link texts
   * @returns {Promise<string[]>} Array of link texts
   */
  async getNavLinkTexts() {
    return this.navLinks.allTextContents();
  }

  // ==========================================
  // CONTENT METHODS
  // ==========================================

  /**
   * Get welcome/greeting message text
   * @returns {Promise<string|null>} Welcome message
   */
  async getWelcomeMessage() {
    return this.welcomeMessage.textContent();
  }

  /**
   * Count number of content cards displayed
   * @returns {Promise<number>} Number of cards
   */
  async getContentCardCount() {
    return this.contentCards.count();
  }

  /**
   * Get all card titles
   * @returns {Promise<string[]>} Array of card titles
   */
  async getAllCardTitles() {
    const cards = this.contentCards;
    const count = await cards.count();
    const titles = [];
    for (let i = 0; i < count; i++) {
      const title = await cards.nth(i).locator('.card-title, h3, h4').textContent();
      titles.push(title?.trim());
    }
    return titles;
  }

  /**
   * Click on a card by index
   * @param {number} index - Zero-based index of the card
   * @returns {Promise<void>}
   */
  async clickCardByIndex(index) {
    await this.contentCards.nth(index).click();
  }

  /**
   * Click on a card by title text
   * @param {string} title - Title text to match
   * @returns {Promise<void>}
   */
  async clickCardByTitle(title) {
    const card = this.page.locator(`.card:has-text("${title}"), .item:has-text("${title}")`);
    await card.click();
  }

  // ==========================================
  // USER MENU METHODS
  // ==========================================

  /**
   * Open user profile menu
   * @returns {Promise<void>}
   */
  async openProfileMenu() {
    await this.profileButton.click();
  }

  /**
   * Logout from the application
   * @returns {Promise<void>}
   */
  async logout() {
    // Some apps have logout in a dropdown menu
    try {
      await this.logoutButton.click();
    } catch {
      // If logout is in dropdown, open profile first
      await this.openProfileMenu();
      await this.logoutButton.click();
    }
  }

  // ==========================================
  // VALIDATION METHODS
  // ==========================================

  /**
   * Check if user is on home page
   * @returns {Promise<boolean>} True if welcome message is visible
   */
  async isOnHomePage() {
    return this.welcomeMessage.isVisible();
  }

  /**
   * Check if search functionality is available
   * @returns {Promise<boolean>} True if search input is visible
   */
  async isSearchAvailable() {
    return this.searchInput.isVisible();
  }

  /**
   * Get current page URL path
   * @returns {Promise<string>} URL path (e.g., '/dashboard')
   */
  async getCurrentPath() {
    const url = this.page.url();
    return new URL(url).pathname;
  }
}

module.exports = HomePage;
