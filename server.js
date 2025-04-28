const express = require('express');
const app = express();
const logger = require('./logger'); // assuming you have a logger.js
const routes = require('./routes/api');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Use your custom API routes
app.use('/api', routes);

// Test API Endpoint
app.get('/apitest', (req, res, next) => {
  try {
    const data = {
      id: Math.floor(Math.random() * 1000),
      status: 'active',
      user: 'user_' + Math.floor(Math.random() * 10000),
      timestamp: new Date().toISOString(),
      score: Math.random().toFixed(2)
    };
    res.json(data);
  } catch (error) {
    next(error); // pass errors to global error handler
  }
});

// MGM College Students API Endpoint
app.get('/mgmstd', (req, res, next) => {
  try {
    const students = [];
    for (let i = 1; i <= 10000; i++) {
      students.push({
        id: i,
        name: `student_${i}`,
        department: ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'][Math.floor(Math.random() * 6)],
        year: Math.floor(Math.random() * 4) + 1, // 1st to 4th year
        cgpa: (Math.random() * 4 + 6).toFixed(2), // CGPA between 6.00 to 10.00
        email: `student${i}@mgmcollege.edu`,
        phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`, // Random phone number
        timestamp: new Date().toISOString()
      });
    }

    // Simulate an error if students list not generated
    if (!students || students.length === 0) {
      throw new Error('Failed to generate student data.');
    }

    res.json(students);
  } catch (error) {
    next(error);
  }
});

// Handle 404 for invalid routes
app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found.`);
  error.status = 404;
  next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;

  // Log the error
  logger.error(`[${new Date().toISOString()}] ${err.message} - ${req.method} ${req.originalUrl}`);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Only listen if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
