const logger = require('../logger');

exports.sayHello = (req, res) => {
  logger.info('GET /api/hello called');
  res.status(200).json({ message: 'Hello World!' });
};

exports.echoMessage = (req, res) => {
  logger.info('POST /api/echo called', req.body);
  res.status(200).json({ youSent: req.body });
};

exports.throwError = (req, res) => {
  logger.error('Intentional error occurred');
  res.status(500).json({ error: 'Something went wrong!' });
};
