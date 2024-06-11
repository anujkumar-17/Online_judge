const express = require('express');
const router = express.Router();
const evaluateController = require('../controllers/evaluate');

router.post('/', evaluateController.evaluateCode);

module.exports = router;