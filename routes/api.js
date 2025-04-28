const express = require('express');
const router = express.Router();
const logger = require('../logger');

router.get('/', (req, res) => {
  logger.info(`GET request to /api`);
  res.send('API is working!');
});

module.exports = router;
