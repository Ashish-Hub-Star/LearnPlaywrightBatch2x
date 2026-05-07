/**
 * @fileoverview Winston Logger Utility
 * Provides structured logging for test execution.
 * Supports console and file outputs with different log levels.
 * 
 * @module src/utils/Logger
 */

const winston = require('winston');
const path = require('path');

// Ensure logs directory exists
const fs = require('fs');
const logDir = process.env.LOG_DIR || 'reports/logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

/**
 * Custom format for console output with colors
 */
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

/**
 * Custom format for file output (no colors, JSON-like)
 */
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.json()
);

/**
 * Winston Logger instance
 * Configured with console and file transports
 */
const logger = winston.createLogger({
  // Default log level from env or 'info'
  level: process.env.LOG_LEVEL || 'info',
  
  // Format for file transports
  format: fileFormat,
  
  // Transports define where logs go
  transports: [
    // Console output with colors (always active)
    new winston.transports.Console({
      format: consoleFormat,
    }),
    
    // Combined log file (all levels)
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    
    // Error log file (only error level)
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  
  // Uncaught exception handling
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, 'exceptions.log'),
    }),
  ],
  
  // Unhandled rejection handling
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, 'rejections.log'),
    }),
  ],
});

/**
 * Log a test step with formatting
 * @param {string} stepName - Name of the test step
 * @param {string} [details] - Additional details
 */
function logTestStep(stepName, details = '') {
  const separator = '='.repeat(60);
  logger.info(separator);
  logger.info(`TEST STEP: ${stepName}`);
  if (details) {
    logger.info(`Details: ${details}`);
  }
  logger.info(separator);
}

/**
 * Log test start information
 * @param {string} testName - Name of the test
 * @param {string} [browserName] - Browser being used
 */
function logTestStart(testName, browserName = '') {
  logger.info('\n');
  logger.info('╔════════════════════════════════════════════════════════════╗');
  logger.info(`║  STARTING TEST: ${testName.padEnd(45)}║`);
  if (browserName) {
    logger.info(`║  Browser: ${browserName.padEnd(52)}║`);
  }
  logger.info('╚════════════════════════════════════════════════════════════╝');
}

/**
 * Log test completion
 * @param {string} testName - Name of the test
 * @param {string} status - Test status (PASSED/FAILED)
 * @param {number} [duration] - Test duration in ms
 */
function logTestEnd(testName, status, duration = 0) {
  const statusSymbol = status === 'PASSED' ? '✓' : '✗';
  const durationStr = duration > 0 ? `(${duration}ms)` : '';
  
  logger.info('╔════════════════════════════════════════════════════════════╗');
  logger.info(`║  ${statusSymbol} TEST ${status}: ${testName.padEnd(38)}║`);
  if (duration) {
    logger.info(`║  Duration: ${durationStr.padEnd(50)}║`);
  }
  logger.info('╚════════════════════════════════════════════════════════════╝\n');
}

/**
 * Log an action being performed
 * @param {string} action - Action description
 * @param {string} [target] - Target element or page
 */
function logAction(action, target = '') {
  const targetStr = target ? ` [${target}]` : '';
  logger.info(`  → ${action}${targetStr}`);
}

module.exports = {
  logger,
  logTestStep,
  logTestStart,
  logTestEnd,
  logAction,
};
