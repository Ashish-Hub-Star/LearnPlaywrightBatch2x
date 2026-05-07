/**
 * @fileoverview Helper Utilities
 * Collection of common helper functions used across the framework.
 * Includes date formatting, string manipulation, random data generation, etc.
 * 
 * @module src/utils/Helpers
 */

/**
 * Generate a random string of specified length
 * @param {number} [length=8] - Length of the string
 * @param {string} [chars='abcdefghijklmnopqrstuvwxyz0123456789'] - Characters to use
 * @returns {string} Random string
 */
function generateRandomString(length = 8, chars = 'abcdefghijklmnopqrstuvwxyz0123456789') {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a random email address
 * @param {string} [domain='test.com'] - Email domain
 * @returns {string} Random email
 */
function generateRandomEmail(domain = 'test.com') {
  const username = generateRandomString(10);
  return `${username}@${domain}`;
}

/**
 * Generate a random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
function generateRandomNumber(min = 1, max = 1000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Format date to a specific string format
 * @param {Date} [date=new Date()] - Date to format
 * @param {string} [format='YYYY-MM-DD'] - Format string
 * @returns {string} Formatted date string
 */
function formatDate(date = new Date(), format = 'YYYY-MM-DD') {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * Wait for a specified duration
 * ⚠️ Use sparingly - prefer Playwright's auto-waiting
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Parse JSON safely without throwing errors
 * @param {string} jsonString - JSON string to parse
 * @param {*} [defaultValue=null] - Default value if parsing fails
 * @returns {*} Parsed object or default value
 */
function safeJsonParse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return defaultValue;
  }
}

/**
 * Convert object to URL query string
 * @param {Object} params - Object with key-value pairs
 * @returns {string} URL encoded query string
 */
function toQueryString(params) {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

/**
 * Truncate string to specified length with ellipsis
 * @param {string} str - String to truncate
 * @param {number} [maxLength=50] - Maximum length
 * @returns {string} Truncated string
 */
function truncateString(str, maxLength = 50) {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
}

/**
 * Retry a function multiple times with delay
 * @param {Function} fn - Function to retry
 * @param {number} [retries=3] - Number of retries
 * @param {number} [delay=1000] - Delay between retries in ms
 * @returns {Promise<*>} Result of the function
 */
async function retry(fn, retries = 3, delay = 1000) {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < retries - 1) {
        await wait(delay);
      }
    }
  }
  throw lastError;
}

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if string is valid URL
 * @param {string} string - String to check
 * @returns {boolean} True if valid URL
 */
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

module.exports = {
  generateRandomString,
  generateRandomEmail,
  generateRandomNumber,
  formatDate,
  wait,
  safeJsonParse,
  toQueryString,
  truncateString,
  retry,
  deepClone,
  isValidUrl,
};
