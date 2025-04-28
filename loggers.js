// logger.js
const fs = require('fs');
const path = require('path');

// Ensure logs folder exists
const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logFilePath = path.join(logDirectory, 'error.log');

// Logging function
const loggers = {
  info: (message) => {
    console.log(`[INFO] ${message}`);
  },
  
  error: (message) => {
    console.error(`[ERROR] ${message}`);

    const logMessage = `[${new Date().toISOString()}] ERROR: ${message}\n`;

    // Append error to error.log file
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
  }
};

module.exports = loggers;
