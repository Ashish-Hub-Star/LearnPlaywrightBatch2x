/**
 * @fileoverview API Test Data
 * Contains request payloads, headers, and expected responses for API testing.
 * Used by API test files for data-driven API testing.
 * 
 * @module src/data/apiData
 */

// ==========================================
// API BASE CONFIGURATION
// ==========================================

/** API base URL - override with environment variable */
const API_BASE_URL = process.env.API_URL || 'https://demoqa.com';

/** Common API headers */
const COMMON_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

/** Authorized headers with token (set after login) */
const AUTH_HEADERS = (token) => ({
  ...COMMON_HEADERS,
  'Authorization': `Bearer ${token}`,
});

// ==========================================
// USER API DATA
// ==========================================

/** User registration request payload */
const USER_REGISTRATION_PAYLOAD = {
  userName: 'testuser_api',
  password: 'Test@123!',
};

/** User login request payload */
const USER_LOGIN_PAYLOAD = {
  userName: 'testuser_api',
  password: 'Test@123!',
};

/** Invalid login payload for negative testing */
const INVALID_LOGIN_PAYLOAD = {
  userName: 'nonexistent',
  password: 'wrongpassword',
};

// ==========================================
// BOOK STORE API DATA
// ==========================================

/** Add book to collection payload */
const ADD_BOOK_PAYLOAD = (userId, isbn) => ({
  userId: userId,
  collectionOfIsbns: [
    {
      isbn: isbn,
    },
  ],
});

/** Remove book from collection payload */
const REMOVE_BOOK_PAYLOAD = (userId, isbn) => ({
  userId: userId,
  isbn: isbn,
});

/** Sample ISBN numbers for book store API */
const SAMPLE_ISBNS = [
  '9781449325862', // Git Pocket Guide
  '9781449331818', // Learning JavaScript Design Patterns
  '9781449365035', // Designing Evolvable Web APIs
  '9781491950296', // Programming JavaScript Applications
];

// ==========================================
// EXPECTED API RESPONSES
// ==========================================

/** Expected successful login response structure */
const EXPECTED_LOGIN_RESPONSE = {
  token: 'string',
  expires: 'string',
  status: 'Success',
  result: 'string',
};

/** Expected user creation response */
const EXPECTED_USER_RESPONSE = {
  userID: 'string',
  username: 'string',
  books: 'array',
};

/** Expected error response structure */
const EXPECTED_ERROR_RESPONSE = {
  code: 'number',
  message: 'string',
};

// ==========================================
// API ENDPOINTS
// ==========================================

/** Book Store API endpoints */
const ENDPOINTS = {
  // Account
  register: '/Account/v1/User',
  login: '/Account/v1/GenerateToken',
  authorized: '/Account/v1/Authorized',
  user: (userId) => `/Account/v1/User/${userId}`,
  
  // Book Store
  books: '/BookStore/v1/Books',
  book: (isbn) => `/BookStore/v1/Book/${isbn}`,
  addBooks: '/BookStore/v1/Books',
  deleteBook: '/BookStore/v1/Book',
  deleteBooks: '/BookStore/v1/Books',
};

// ==========================================
// STATUS CODES
// ==========================================

/** HTTP status codes for validation */
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  API_BASE_URL,
  COMMON_HEADERS,
  AUTH_HEADERS,
  USER_REGISTRATION_PAYLOAD,
  USER_LOGIN_PAYLOAD,
  INVALID_LOGIN_PAYLOAD,
  ADD_BOOK_PAYLOAD,
  REMOVE_BOOK_PAYLOAD,
  SAMPLE_ISBNS,
  EXPECTED_LOGIN_RESPONSE,
  EXPECTED_USER_RESPONSE,
  EXPECTED_ERROR_RESPONSE,
  ENDPOINTS,
  STATUS_CODES,
};
