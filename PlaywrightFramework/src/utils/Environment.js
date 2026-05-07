/**
 * @fileoverview Environment Configuration Handler
 * Manages environment-specific settings and URLs.
 * Reads from .env file and provides centralized config access.
 * 
 * @module src/utils/Environment
 */

// Load environment variables
require('dotenv').config();

/**
 * Environment Configuration Object
 * Centralized access to all environment settings
 */
const Environment = {
  // ==========================================
  // APPLICATION URLs
  // ==========================================
  
  /** Base URL for the application under test */
  get baseUrl() {
    return process.env.BASE_URL || 'https://demoqa.com';
  },
  
  /** API base URL */
  get apiUrl() {
    return process.env.API_URL || 'https://demoqa.com';
  },
  
  // ==========================================
  // CREDENTIALS
  // ==========================================
  
  /** Valid test username */
  get validUsername() {
    return process.env.VALID_USERNAME || 'testuser';
  },
  
  /** Valid test password */
  get validPassword() {
    return process.env.VALID_PASSWORD || 'Test@123';
  },
  
  /** Invalid test username (for negative testing) */
  get invalidUsername() {
    return process.env.INVALID_USERNAME || 'wronguser';
  },
  
  /** Invalid test password (for negative testing) */
  get invalidPassword() {
    return process.env.INVALID_PASSWORD || 'wrongpass';
  },
  
  // ==========================================
  // ENVIRONMENT SETTINGS
  // ==========================================
  
  /** Current environment (development, staging, production) */
  get nodeEnv() {
    return process.env.NODE_ENV || 'development';
  },
  
  /** Target browser (chromium, firefox, webkit) */
  get browser() {
    return process.env.BROWSER || 'chromium';
  },
  
  /** Run in headless mode */
  get headless() {
    return process.env.HEADLESS === 'true';
  },
  
  // ==========================================
  // TEST CONFIGURATION
  // ==========================================
  
  /** Number of parallel workers */
  get workers() {
    return parseInt(process.env.WORKERS || '4', 10);
  },
  
  /** Enable screenshots */
  get enableScreenshots() {
    return process.env.ENABLE_SCREENSHOTS === 'true';
  },
  
  /** Enable video recording */
  get enableVideo() {
    return process.env.ENABLE_VIDEO === 'true';
  },
  
  /** Enable tracing */
  get enableTrace() {
    return process.env.ENABLE_TRACE === 'true';
  },
  
  // ==========================================
  // LOGGING
  // ==========================================
  
  /** Log level */
  get logLevel() {
    return process.env.LOG_LEVEL || 'info';
  },
  
  /** Log directory */
  get logDir() {
    return process.env.LOG_DIR || 'reports/logs';
  },
  
  // ==========================================
  // HELPER METHODS
  // ==========================================
  
  /**
   * Check if running in CI environment
   * @returns {boolean} True if CI environment
   */
  get isCI() {
    return !!process.env.CI;
  },
  
  /**
   * Check if running in development mode
   * @returns {boolean} True if development
   */
  get isDevelopment() {
    return this.nodeEnv === 'development';
  },
  
  /**
   * Check if running in staging mode
   * @returns {boolean} True if staging
   */
  get isStaging() {
    return this.nodeEnv === 'staging';
  },
  
  /**
   * Check if running in production mode
   * @returns {boolean} True if production
   */
  get isProduction() {
    return this.nodeEnv === 'production';
  },
  
  /**
   * Get full URL by appending path to base URL
   * @param {string} path - URL path (e.g., '/login')
   * @returns {string} Full URL
   */
  getUrl(path) {
    const baseUrl = this.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    const cleanPath = path.replace(/^\//, ''); // Remove leading slash
    return `${baseUrl}/${cleanPath}`;
  },
  
  /**
   * Get API URL by appending endpoint
   * @param {string} endpoint - API endpoint
   * @returns {string} Full API URL
   */
  getApiUrl(endpoint) {
    const apiUrl = this.apiUrl.replace(/\/$/, '');
    const cleanEndpoint = endpoint.replace(/^\//, '');
    return `${apiUrl}/${cleanEndpoint}`;
  },
  
  /**
   * Print current environment configuration (for debugging)
   */
  printConfig() {
    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║     ENVIRONMENT CONFIGURATION            ║');
    console.log('╠══════════════════════════════════════════╣');
    console.log(`║  Environment: ${this.nodeEnv.padEnd(28)} ║`);
    console.log(`║  Base URL: ${this.baseUrl.padEnd(31)} ║`);
    console.log(`║  API URL: ${this.apiUrl.padEnd(32)} ║`);
    console.log(`║  Browser: ${this.browser.padEnd(32)} ║`);
    console.log(`║  Headless: ${String(this.headless).padEnd(31)} ║`);
    console.log(`║  Workers: ${String(this.workers).padEnd(32)} ║`);
    console.log(`║  Log Level: ${this.logLevel.padEnd(30)} ║`);
    console.log('╚══════════════════════════════════════════╝\n');
  },
};

module.exports = Environment;
