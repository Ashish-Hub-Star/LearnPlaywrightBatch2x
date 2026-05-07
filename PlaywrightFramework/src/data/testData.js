/**
 * @fileoverview Static Test Data
 * Contains all test data used across UI and API tests.
 * Centralized data management for easy updates and maintenance.
 * 
 * @module src/data/testData
 */

// ==========================================
// LOGIN TEST DATA
// ==========================================

/** Valid user credentials for positive testing */
const VALID_USER = {
  username: process.env.VALID_USERNAME || 'testuser',
  password: process.env.VALID_PASSWORD || 'Test@123',
  email: 'testuser@example.com',
};

/** Invalid user credentials for negative testing */
const INVALID_USER = {
  username: process.env.INVALID_USERNAME || 'wronguser',
  password: process.env.INVALID_PASSWORD || 'wrongpass',
};

/** Empty credentials for validation testing */
const EMPTY_CREDENTIALS = {
  username: '',
  password: '',
};

/** Multiple test users for data-driven testing */
const TEST_USERS = [
  { username: 'user1', password: 'Pass123!', description: 'Standard user' },
  { username: 'user2', password: 'Pass456!', description: 'Admin user' },
  { username: 'user3', password: 'Pass789!', description: 'Guest user' },
];

// ==========================================
// REGISTRATION TEST DATA
// ==========================================

/** Valid registration data */
const VALID_REGISTRATION = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe2024',
  password: 'SecurePass123!',
};

/** Invalid registration data for validation testing */
const INVALID_REGISTRATIONS = [
  { firstName: '', lastName: 'Doe', username: 'johndoe', password: 'pass', error: 'First name is required' },
  { firstName: 'John', lastName: '', username: 'johndoe', password: 'pass', error: 'Last name is required' },
  { firstName: 'John', lastName: 'Doe', username: '', password: 'pass', error: 'Username is required' },
  { firstName: 'John', lastName: 'Doe', username: 'johndoe', password: '12', error: 'Password too short' },
];

// ==========================================
// SEARCH TEST DATA
// ==========================================

/** Search terms for testing search functionality */
const SEARCH_TERMS = {
  valid: 'Playwright',
  invalid: 'xyznonexistent123',
  specialChars: '!@#$%',
  longQuery: 'a'.repeat(100),
  sqlInjection: "'; DROP TABLE users; --",
};

// ==========================================
// FORM TEST DATA
// ==========================================

/** Sample form data for practice forms */
const PRACTICE_FORM_DATA = {
  firstName: 'Ashish',
  lastName: 'Joshi',
  email: 'ashish@example.com',
  mobile: '9876543210',
  dob: '01 Jan 1990',
  subjects: ['Maths', 'Computer Science'],
  hobbies: ['Sports', 'Reading'],
  address: '123 Test Street, Test City',
  state: 'NCR',
  city: 'Delhi',
};

// ==========================================
// BOOK STORE DATA (for demoqa.com)
// ==========================================

/** Sample books for testing book store functionality */
const BOOKS = [
  { title: 'Git Pocket Guide', author: 'Richard E. Silverman', publisher: "O'Reilly Media" },
  { title: 'Learning JavaScript Design Patterns', author: 'Addy Osmani', publisher: "O'Reilly Media" },
  { title: 'Designing Evolvable Web APIs with ASP.NET', author: 'Glenn Block', publisher: 'Microsoft Press' },
  { title: 'Speaking JavaScript', author: 'Axel Rauschmayer', publisher: "O'Reilly Media" },
];

// ==========================================
// URL PATHS
// ==========================================

/** Application page paths */
const URL_PATHS = {
  login: '/login',
  register: '/register',
  home: '/',
  profile: '/profile',
  books: '/books',
  bookStore: '/books',
  practiceForm: '/automation-practice-form',
  textBox: '/text-box',
  checkBox: '/checkbox',
  radioButton: '/radio-button',
  webTables: '/webtables',
  buttons: '/buttons',
  links: '/links',
  dynamicProperties: '/dynamic-properties',
  uploadDownload: '/upload-download',
};

// ==========================================
// MESSAGES & EXPECTED TEXTS
// ==========================================

/** Expected error messages */
const ERROR_MESSAGES = {
  invalidCredentials: 'Invalid username or password',
  usernameRequired: 'UserName is required',
  passwordRequired: 'Password is required',
  loginFailed: 'Login failed',
  fieldRequired: 'This field is required',
};

/** Expected success messages */
const SUCCESS_MESSAGES = {
  loginSuccess: 'Login successful',
  registrationSuccess: 'User Register Successfully',
  bookAdded: 'Book added to your collection',
  bookDeleted: 'Book deleted',
};

// ==========================================
// TIMEOUTS & WAIT TIMES
// ==========================================

/** Standard wait times in milliseconds */
const TIMEOUTS = {
  short: 1000,
  medium: 5000,
  long: 10000,
  extraLong: 30000,
};

// ==========================================
// BROWSER VIEWPORTS
// ==========================================

/** Common viewport sizes for responsive testing */
const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  laptop: { width: 1366, height: 768 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
};

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  // Users
  VALID_USER,
  INVALID_USER,
  EMPTY_CREDENTIALS,
  TEST_USERS,
  
  // Registration
  VALID_REGISTRATION,
  INVALID_REGISTRATIONS,
  
  // Search
  SEARCH_TERMS,
  
  // Forms
  PRACTICE_FORM_DATA,
  
  // Books
  BOOKS,
  
  // URLs
  URL_PATHS,
  
  // Messages
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  
  // Timeouts
  TIMEOUTS,
  
  // Viewports
  VIEWPORTS,
};
