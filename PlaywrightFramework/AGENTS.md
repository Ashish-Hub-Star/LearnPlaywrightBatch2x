# Agent Guide for Playwright Learning Framework

This file contains context and instructions for AI coding assistants working on this project.

## Project Overview

- **Type:** Playwright automation framework
- **Language:** JavaScript (Node.js)
- **Purpose:** Educational framework for learning Playwright
- **Design Pattern:** Page Object Model (POM)
- **Browser Support:** Chromium, Firefox, WebKit

## Architecture Decisions

1. **Folder Structure:**
   - `src/pages/` - Page Object classes (inherit from BasePage)
   - `src/utils/` - Helper utilities (logger, screenshots, config)
   - `src/fixtures/` - Custom Playwright fixtures
   - `src/data/` - Static test data
   - `tests/ui/` - End-to-end UI tests
   - `tests/api/` - API tests

2. **Naming Conventions:**
   - Page objects: `PascalCase` (e.g., `LoginPage.js`)
   - Tests: `*.spec.js` or `*.test.js`
   - Utilities: `PascalCase` for classes, `camelCase` for files
   - Constants: `UPPER_SNAKE_CASE`

3. **Coding Standards:**
   - Use async/await for all Playwright operations
   - Add JSDoc comments for all methods
   - Use semantic method names in page objects
   - Keep tests independent (no shared state)
   - Use tags for test categorization (@smoke, @regression)

4. **Environment Management:**
   - Use `.env` file for secrets and environment-specific URLs
   - Never commit `.env` to git
   - Use `.env.example` as a template
   - Access via `process.env.VARIABLE_NAME`

5. **Error Handling:**
   - Let Playwright auto-retry on failures
   - Use explicit waits instead of fixed timeouts
   - Capture screenshots on failure (configured in fixtures)
   - Log all actions for debugging

## Common Commands

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/ui/login.spec.js

# Run in headed mode (see browser)
npx playwright test --headed

# Run with UI
npx playwright test --ui

# Debug mode
npx playwright test --debug

# Generate code
npx playwright codegen URL

# Show report
npx playwright show-report
```

## Key Files to Understand

1. `playwright.config.js` - Main configuration
2. `src/pages/BasePage.js` - Parent class for all pages
3. `src/fixtures/testFixtures.js` - Test setup and dependencies
4. `src/utils/Logger.js` - Logging utility
5. `src/utils/Environment.js` - Environment config

## When Making Changes

1. Update this file if changing architecture
2. Add JSDoc comments for new methods
3. Update README.md if adding major features
4. Update FLOW.md if changing execution flow
5. Ensure tests pass before committing

## Testing Guidelines

- Write tests before fixing bugs (TDD)
- Keep tests under 30 seconds
- Use test.describe for grouping
- Use test.beforeEach for common setup
- Tag tests appropriately (@smoke, @regression, @api)
- Avoid hardcoded waits (use Playwright auto-waiting)

## Dependencies

- `@playwright/test` - Core testing framework
- `dotenv` - Environment variable management
- `winston` - Logging
- `ajv` - JSON schema validation (for API tests)

## Contact

Project Owner: Ashish-Hub-Star
Repository: https://github.com/Ashish-Hub-Star/LearnPlaywrightBatch2x
