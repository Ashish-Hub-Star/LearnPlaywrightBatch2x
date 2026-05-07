/**
 * @fileoverview API Tests
 * Demonstrates Playwright APIRequestContext for testing REST APIs.
 * Covers CRUD operations, authentication, and response validation.
 * 
 * @module tests/api/api.spec
 */

const { test, expect } = require('@playwright/test');
const {
  API_BASE_URL,
  COMMON_HEADERS,
  USER_REGISTRATION_PAYLOAD,
  USER_LOGIN_PAYLOAD,
  INVALID_LOGIN_PAYLOAD,
  ENDPOINTS,
  STATUS_CODES,
} = require('../../src/data/apiData');

test.describe('API Tests @api', () => {
  
  /**
   * Base URL for all API requests
   */
  const baseUrl = API_BASE_URL;

  // ==========================================
  // HEALTH CHECK TESTS
  // ==========================================

  /**
   * Test: API base URL is accessible
   */
  test('API base URL returns successful response @smoke', async ({ request }) => {
    const response = await request.get(baseUrl);
    
    // Verify status is OK (200)
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(STATUS_CODES.OK);
  });

  // ==========================================
  // AUTHENTICATION TESTS
  // ==========================================

  /**
   * Test: Generate token with valid credentials
   */
  test('POST /GenerateToken with valid credentials returns token @smoke', async ({ request }) => {
    const response = await request.post(`${baseUrl}${ENDPOINTS.login}`, {
      headers: COMMON_HEADERS,
      data: USER_LOGIN_PAYLOAD,
    });

    // Verify status code
    expect(response.status()).toBe(STATUS_CODES.OK);

    // Parse response body
    const responseBody = await response.json();
    
    // Verify response structure
    expect(responseBody).toHaveProperty('token');
    expect(responseBody).toHaveProperty('expires');
    expect(responseBody).toHaveProperty('status');
    expect(responseBody.status).toBe('Success');
    
    // Verify token is not empty
    expect(responseBody.token).toBeTruthy();
    expect(responseBody.token.length).toBeGreaterThan(0);
  });

  /**
   * Test: Generate token with invalid credentials returns error
   */
  test('POST /GenerateToken with invalid credentials returns error @regression', async ({ request }) => {
    const response = await request.post(`${baseUrl}${ENDPOINTS.login}`, {
      headers: COMMON_HEADERS,
      data: INVALID_LOGIN_PAYLOAD,
    });

    // Parse response regardless of status
    const responseBody = await response.json();
    
    // Verify error response structure
    expect(responseBody).toHaveProperty('token');
    expect(responseBody).toHaveProperty('status');
    
    // Status should indicate failure
    expect(responseBody.status).not.toBe('Success');
  });

  /**
   * Test: Check authorization status
   */
  test('POST /Authorized checks user authorization @smoke', async ({ request }) => {
    const response = await request.post(`${baseUrl}${ENDPOINTS.authorized}`, {
      headers: COMMON_HEADERS,
      data: USER_LOGIN_PAYLOAD,
    });

    const responseBody = await response.json();
    
    // Response is boolean indicating authorization status
    expect(typeof responseBody).toBe('boolean');
  });

  // ==========================================
  // BOOK STORE API TESTS
  // ==========================================

  /**
   * Test: Get all books
   */
  test('GET /Books returns list of books @smoke', async ({ request }) => {
    const response = await request.get(`${baseUrl}${ENDPOINTS.books}`, {
      headers: COMMON_HEADERS,
    });

    // Verify success status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(STATUS_CODES.OK);

    // Parse and verify response structure
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('books');
    expect(Array.isArray(responseBody.books)).toBeTruthy();
    expect(responseBody.books.length).toBeGreaterThan(0);

    // Verify book object structure
    const firstBook = responseBody.books[0];
    expect(firstBook).toHaveProperty('isbn');
    expect(firstBook).toHaveProperty('title');
    expect(firstBook).toHaveProperty('author');
    expect(firstBook).toHaveProperty('publish_date');
  });

  /**
   * Test: Get specific book by ISBN
   */
  test('GET /Book/{ISBN} returns specific book details @smoke', async ({ request }) => {
    const isbn = '9781449325862'; // Git Pocket Guide
    
    const response = await request.get(`${baseUrl}${ENDPOINTS.book(isbn)}`, {
      headers: COMMON_HEADERS,
    });

    expect(response.status()).toBe(STATUS_CODES.OK);

    const book = await response.json();
    expect(book).toHaveProperty('isbn', isbn);
    expect(book).toHaveProperty('title');
    expect(book).toHaveProperty('author');
    expect(book).toHaveProperty('publisher');
  });

  /**
   * Test: Get book with invalid ISBN returns 404
   */
  test('GET /Book with invalid ISBN returns 404 @regression', async ({ request }) => {
    const invalidIsbn = '0000000000000';
    
    const response = await request.get(`${baseUrl}${ENDPOINTS.book(invalidIsbn)}`, {
      headers: COMMON_HEADERS,
    });

    // Should return not found or bad request
    expect([STATUS_CODES.NOT_FOUND, STATUS_CODES.BAD_REQUEST]).toContain(response.status());
  });

  // ==========================================
  // RESPONSE HEADER TESTS
  // ==========================================

  /**
   * Test: Verify response headers
   */
  test('API responses have correct content-type header @smoke', async ({ request }) => {
    const response = await request.get(`${baseUrl}${ENDPOINTS.books}`, {
      headers: COMMON_HEADERS,
    });

    const headers = response.headers();
    
    // Verify content-type is JSON
    expect(headers['content-type']).toContain('application/json');
  });

  // ==========================================
  // DATA-DRIVEN API TESTS
  // ==========================================

  /**
   * Test: Verify multiple books exist
   */
  const bookIsbns = [
    '9781449325862',
    '9781449331818',
    '9781449365035',
  ];

  for (const isbn of bookIsbns) {
    test(`GET /Book/{ISBN} returns book for ISBN: ${isbn} @regression`, async ({ request }) => {
      const response = await request.get(`${baseUrl}${ENDPOINTS.book(isbn)}`, {
        headers: COMMON_HEADERS,
      });

      expect(response.status()).toBe(STATUS_CODES.OK);

      const book = await response.json();
      expect(book).toHaveProperty('isbn', isbn);
      expect(book.title).toBeTruthy();
    });
  }

  // ==========================================
  // ERROR HANDLING TESTS
  // ==========================================

  /**
   * Test: Invalid endpoint returns 404
   */
  test('GET invalid endpoint returns 404 @regression', async ({ request }) => {
    const response = await request.get(`${baseUrl}/invalid-endpoint`);
    
    // Should return not found
    expect(response.status()).toBe(STATUS_CODES.NOT_FOUND);
  });

  /**
   * Test: Invalid HTTP method returns error
   */
  test('DELETE /Books without authentication returns error @regression', async ({ request }) => {
    const response = await request.delete(`${baseUrl}${ENDPOINTS.books}`, {
      headers: COMMON_HEADERS,
    });

    // Should return unauthorized or forbidden without auth
    expect([STATUS_CODES.UNAUTHORIZED, STATUS_CODES.FORBIDDEN, STATUS_CODES.BAD_REQUEST]).toContain(response.status());
  });
});

// ==========================================
// SCHEMA VALIDATION TESTS (using AJV)
// ==========================================

test.describe('API Schema Validation @api @schema', () => {
  
  const baseUrl = API_BASE_URL;

  /**
   * Test: Validate books response schema
   */
  test('GET /Books response matches expected schema', async ({ request }) => {
    const Ajv = require('ajv');
    const ajv = new Ajv();

    // Define expected schema
    const bookSchema = {
      type: 'object',
      properties: {
        books: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              isbn: { type: 'string' },
              title: { type: 'string' },
              subTitle: { type: 'string' },
              author: { type: 'string' },
              publish_date: { type: 'string' },
              publisher: { type: 'string' },
              pages: { type: 'number' },
              description: { type: 'string' },
              website: { type: 'string' },
            },
            required: ['isbn', 'title', 'author'],
          },
        },
      },
      required: ['books'],
    };

    const response = await request.get(`${baseUrl}${ENDPOINTS.books}`, {
      headers: COMMON_HEADERS,
    });

    const responseBody = await response.json();
    
    // Validate schema
    const validate = ajv.compile(bookSchema);
    const valid = validate(responseBody);
    
    expect(valid).toBeTruthy();
  });
});
