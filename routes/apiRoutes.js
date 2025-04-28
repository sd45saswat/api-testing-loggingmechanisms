const express = require('express');
const router = express.Router();
const helloController = require('../controllers/helloController');

router.get('/hello', helloController.sayHello);
router.post('/echo', helloController.echoMessage);
router.get('/error', helloController.throwError);

module.exports = router;
