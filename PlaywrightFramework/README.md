# Playwright Learning Framework

A comprehensive Playwright automation framework designed for beginners and professionals to understand Playwright concepts thoroughly.

## 🎯 Purpose

This framework demonstrates:
- **Page Object Model (POM)** design pattern
- **Configuration management** for multiple environments
- **Utility functions** for screenshots, logging, and helpers
- **Parallel execution** strategies
- **CI/CD integration** with GitHub Actions
- **Test data management**
- **Reporting and debugging**

## 📁 Project Structure

```
playwright-learning-framework/
│
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline configuration
│
├── src/
│   ├── pages/                       # Page Object Model classes
│   │   ├── BasePage.js              # Base class with common methods
│   │   ├── LoginPage.js             # Login page actions and locators
│   │   └── HomePage.js              # Home page actions and locators
│   │
│   ├── utils/                       # Utility functions
│   │   ├── Logger.js                # Winston logger configuration
│   │   ├── ScreenshotHelper.js      # Screenshot capture utilities
│   │   ├── Helpers.js               # Common helper methods
│   │   └── Environment.js           # Environment configuration handler
│   │
│   ├── fixtures/                    # Test fixtures (setup/teardown)
│   │   └── testFixtures.js          # Custom fixtures extending Playwright
│   │
│   └── data/                        # Test data
│       ├── testData.js              # Static test data
│       └── apiData.js               # API test data
│
├── tests/
│   ├── ui/                          # UI/E2E tests
│   │   ├── login.spec.js            # Login feature tests
│   │   └── homepage.spec.js         # Home page tests
│   │
│   └── api/                         # API tests
│       └── api.spec.js              # API testing examples
│
├── reports/                         # Test reports output
│   └── .gitkeep
│
├── screenshots/                     # Screenshot captures
│   └── .gitkeep
│
├── videos/                          # Test recordings
│   └── .gitkeep
│
├── playwright.config.js             # Main Playwright configuration
│
├── .env                             # Environment variables (not in git)
│
├── .env.example                     # Example environment file
│
├── .gitignore                       # Git ignore rules
│
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ashish-Hub-Star/LearnPlaywrightBatch2x.git
   cd LearnPlaywrightBatch2x
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials and URLs
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run with browser visible (headed mode)
npm run test:headed

# Run specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Run tests with specific tag
npm run test:smoke
npm run test:regression

# Run in debug mode
npm run test:debug

# Open Playwright UI mode
npm run test:ui

# View HTML report
npm run test:report
```

## 🏗️ Architecture Flow

```
Test File (spec.js)
    │
    ├── Uses Fixtures (testFixtures.js)
    │       └── Provides Page Objects + Setup/Teardown
    │
    ├── Uses Page Objects (LoginPage.js, HomePage.js)
    │       └── Extends BasePage.js
    │               └── Contains Common Methods (click, fill, wait)
    │
    ├── Uses Utils (Helpers, Logger, Screenshot)
    │       └── Logging, Screenshots, Config
    │
    └── Uses Test Data (testData.js)
            └── Credentials, URLs, Test Inputs
```

## 🧩 Key Concepts Demonstrated

### 1. Page Object Model (POM)
Separates page-specific logic from test logic for maintainability.

### 2. Fixtures
Custom fixtures extend Playwright's built-in fixtures to inject page objects and setup.

### 3. Parallel Execution
Tests run in parallel by default with configurable workers.

### 4. Screenshots & Videos
Automatic capture on failure and manual capture for verification.

### 5. Environment Management
Switch between dev, staging, and prod environments via `.env` file.

### 6. Logging
Winston logger for detailed test execution logs.

### 7. Tagging & Filtering
Organize tests with tags like `@smoke`, `@regression`, `@api`.

### 8. CI/CD Integration
GitHub Actions workflow for continuous testing.

## 📖 Learning Path

1. **Start here:** `tests/ui/login.spec.js` - Basic test structure
2. **Understand POM:** `src/pages/LoginPage.js` - Page object pattern
3. **Explore utilities:** `src/utils/` - Helper functions
4. **Check configuration:** `playwright.config.js` - Setup options
5. **Review fixtures:** `src/fixtures/testFixtures.js` - Test setup
6. **Run and experiment:** Try different commands and flags

## 🤝 Contributing

Feel free to add more page objects, tests, and utilities as you learn!

## 📝 License

MIT
