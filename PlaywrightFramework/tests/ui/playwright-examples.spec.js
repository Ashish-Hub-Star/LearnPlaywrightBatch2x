/**
 * @fileoverview Playwright Test Examples
 * Demonstrates various Playwright features and testing patterns.
 * These are standalone examples for learning purposes.
 * 
 * @module tests/ui/playwright-examples.spec
 */

const { test, expect } = require('@playwright/test');

test.describe('Playwright Feature Examples @examples', () => {
  
  // ==========================================
  // BASIC INTERACTIONS
  // ==========================================

  test('basic click and type interactions', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // Fill input fields
    await page.locator('#userName').fill('John Doe');
    await page.locator('#userEmail').fill('john@example.com');
    
    // Click button
    await page.locator('#submit').click();
    
    // Verify output
    await expect(page.locator('#name')).toContainText('John Doe');
  });

  // ==========================================
  // DROPDOWN HANDLING
  // ==========================================

  test('select dropdown options', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    
    // Select by value
    await page.locator('#oldSelectMenu').selectOption('2'); // Green
    
    // Select by label
    await page.locator('#oldSelectMenu').selectOption({ label: 'Blue' });
    
    // Multi-select
    await page.locator('#cars').selectOption(['volvo', 'saab']);
  });

  // ==========================================
  // CHECKBOXES AND RADIO BUTTONS
  // ==========================================

  test('checkbox and radio button interactions', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
    // Check checkbox
    await page.locator('.rct-checkbox').click();
    
    // Verify it's checked
    await expect(page.locator('.rct-icon-check')).toBeVisible();
    
    // Radio buttons
    await page.goto('https://demoqa.com/radio-button');
    await page.locator('label[for="yesRadio"]').click();
    
    // Verify selection
    await expect(page.locator('.text-success')).toHaveText('Yes');
  });

  // ==========================================
  // TABLE HANDLING
  // ==========================================

  test('read and validate table data', async ({ page }) => {
    await page.goto('https://demoqa.com/webtables');
    
    // Get all rows
    const rows = await page.locator('.rt-tbody .rt-tr:not(.-padRow)').all();
    expect(rows.length).toBeGreaterThan(0);
    
    // Get specific cell value
    const firstName = await page.locator('.rt-tbody .rt-tr:first-child .rt-td:nth-child(1)').textContent();
    console.log('First name:', firstName);
    
    // Search in table
    await page.locator('#searchBox').fill('Cierra');
    await page.keyboard.press('Enter');
    
    // Verify filtered results
    await expect(page.locator('.rt-tbody')).toContainText('Cierra');
  });

  // ==========================================
  // HOVER AND DOUBLE CLICK
  // ==========================================

  test('hover and double click actions', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    
    // Double click
    await page.locator('#doubleClickBtn').dblclick();
    await expect(page.locator('#doubleClickMessage')).toBeVisible();
    
    // Right click
    await page.locator('#rightClickBtn').click({ button: 'right' });
    await expect(page.locator('#rightClickMessage')).toBeVisible();
    
    // Hover (if tooltip example available)
    // await page.locator('#toolTipButton').hover();
  });

  // ==========================================
  // ALERTS AND DIALOGS
  // ==========================================

  test('handle alerts and dialogs', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');
    
    // Handle simple alert
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toContain('You clicked');
      await dialog.accept();
    });
    
    await page.locator('#alertButton').click();
  });

  test('handle confirmation dialogs', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');
    
    // Accept confirm dialog
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });
    
    await page.locator('#confirmButton').click();
    await expect(page.locator('#confirmResult')).toContainText('Ok');
  });

  test('handle prompt dialogs', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');
    
    // Fill prompt dialog
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept('Playwright is awesome!');
    });
    
    await page.locator('#promtButton').click();
    await expect(page.locator('#promptResult')).toContainText('Playwright is awesome');
  });

  // ==========================================
  // IFRAME HANDLING
  // ==========================================

  test('interact with iframes', async ({ page }) => {
    await page.goto('https://demoqa.com/frames');
    
    // Access iframe using frameLocator
    const frame = page.frameLocator('#frame1');
    const heading = frame.locator('#sampleHeading');
    
    await expect(heading).toHaveText('This is a sample page');
  });

  // ==========================================
  // FILE UPLOAD AND DOWNLOAD
  // ==========================================

  test('upload file', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    // Upload file
    await page.locator('#uploadFile').setInputFiles({
      name: 'test-file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('This is a test file content'),
    });
    
    // Verify upload success
    await expect(page.locator('#uploadedFilePath')).toContainText('test-file.txt');
  });

  test('download file', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    // Wait for download event
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#downloadButton').click(),
    ]);
    
    // Verify download
    expect(download.suggestedFilename()).toBeTruthy();
  });

  // ==========================================
  // KEYBOARD ACTIONS
  // ==========================================

  test('keyboard shortcuts and actions', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    const input = page.locator('#userName');
    
    // Type with keyboard
    await input.press('Control+a'); // Select all
    await input.press('Delete'); // Delete
    await input.type('Hello World');
    
    // Press Enter
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
  });

  // ==========================================
  // MOUSE ACTIONS
  // ==========================================

  test('advanced mouse actions', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    
    // Click at specific coordinates
    const button = page.locator('#doubleClickBtn');
    const box = await button.boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    
    // Drag and drop (if available)
    // await page.dragAndDrop('#source', '#target');
  });

  // ==========================================
  // ASSERTIONS - VARIOUS TYPES
  // ==========================================

  test('various assertion types', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // Element state assertions
    await expect(page.locator('#userName')).toBeVisible();
    await expect(page.locator('#userName')).toBeEnabled();
    await expect(page.locator('#userName')).toBeEmpty();
    
    // Text assertions
    await page.locator('#userName').fill('Test User');
    await expect(page.locator('#userName')).toHaveValue('Test User');
    
    // URL assertions
    await expect(page).toHaveURL(/.*text-box.*/);
    
    // Title assertions
    await expect(page).toHaveTitle(/.*Tools.*/);
    
    // Count assertions
    await expect(page.locator('input')).toHaveCount(4);
  });

  // ==========================================
  // SCREENSHOT EXAMPLES
  // ==========================================

  test('capture various screenshots', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Full page screenshot
    await page.screenshot({ path: 'screenshots/full-page.png', fullPage: true });
    
    // Viewport screenshot
    await page.screenshot({ path: 'screenshots/viewport.png' });
    
    // Element screenshot
    await page.locator('.banner-image').screenshot({ path: 'screenshots/element.png' });
  });

  // ==========================================
  // WAITING STRATEGIES
  // ==========================================

  test('different waiting strategies', async ({ page }) => {
    await page.goto('https://demoqa.com/dynamic-properties');
    
    // Wait for element to be visible
    await page.locator('#visibleAfter').waitFor({ state: 'visible', timeout: 10000 });
    
    // Wait for element to be enabled
    await page.locator('#enableAfter').waitFor({ state: 'visible' });
    
    // Wait for load state
    await page.waitForLoadState('networkidle');
    
    // Wait for URL
    // await page.waitForURL('**/expected-path');
    
    // Wait for response
    // await page.waitForResponse('**/api/endpoint');
  });

  // ==========================================
  // MULTIPLE TABS/WINDOWS
  // ==========================================

  test('handle multiple tabs', async ({ page, context }) => {
    await page.goto('https://demoqa.com/links');
    
    // Click link that opens in new tab
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('#simpleLink').click(),
    ]);
    
    // Wait for new page to load
    await newPage.waitForLoadState();
    
    // Verify new page
    expect(newPage.url()).toContain('demoqa.com');
    
    // Close new tab
    await newPage.close();
  });

  // ==========================================
  // BROWSER CONTEXT & COOKIES
  // ==========================================

  test('manage cookies', async ({ page, context }) => {
    await page.goto('https://demoqa.com');
    
    // Get all cookies
    const cookies = await context.cookies();
    console.log('Cookies:', cookies);
    
    // Add cookie
    await context.addCookies([{
      name: 'test-cookie',
      value: 'test-value',
      domain: '.demoqa.com',
      path: '/',
    }]);
    
    // Verify cookie
    const addedCookies = await context.cookies();
    const testCookie = addedCookies.find(c => c.name === 'test-cookie');
    expect(testCookie).toBeTruthy();
  });

  // ==========================================
  // LOCAL STORAGE & SESSION STORAGE
  // ==========================================

  test('manage local storage', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Set local storage item
    await page.evaluate(() => {
      localStorage.setItem('test-key', 'test-value');
    });
    
    // Get local storage item
    const value = await page.evaluate(() => {
      return localStorage.getItem('test-key');
    });
    
    expect(value).toBe('test-value');
  });

  // ==========================================
  // GEOLOCATION & PERMISSIONS
  // ==========================================

  test('mock geolocation', async ({ browser }) => {
    // Create context with specific geolocation
    const context = await browser.newContext({
      geolocation: { longitude: 77.1025, latitude: 28.7041 }, // Delhi coordinates
      permissions: ['geolocation'],
    });
    
    const page = await context.newPage();
    await page.goto('https://demoqa.com');
    
    // Geolocation is now set to Delhi, India
    await context.close();
  });

  // ==========================================
  // MOBILE EMULATION
  // ==========================================

  test('mobile viewport emulation', async ({ browser }) => {
    // Create mobile context
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
    });
    
    const page = await context.newPage();
    await page.goto('https://demoqa.com');
    
    // Verify mobile rendering
    await expect(page.locator('body')).toBeVisible();
    
    await context.close();
  });

  // ==========================================
  // NETWORK INTERCEPTION
  // ==========================================

  test('intercept and mock network requests', async ({ page }) => {
    // Intercept API calls
    await page.route('**/api/**', async (route) => {
      // You can modify requests here
      await route.continue();
    });
    
    // Mock API response
    await page.route('**/api/users', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ users: [{ id: 1, name: 'Mock User' }] }),
      });
    });
    
    await page.goto('https://demoqa.com');
  });

  // ==========================================
  // PERFORMANCE METRICS
  // ==========================================

  test('capture performance metrics', async ({ page }) => {
    await page.goto('https://demoqa.com');
    
    // Get performance metrics
    const performanceTiming = await page.evaluate(() => {
      return JSON.parse(JSON.stringify(window.performance.timing));
    });
    
    console.log('Page load time:', performanceTiming.loadEventEnd - performanceTiming.navigationStart);
    console.log('DOM content loaded:', performanceTiming.domContentLoadedEventEnd - performanceTiming.navigationStart);
  });
});
