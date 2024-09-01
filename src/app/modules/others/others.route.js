const express = require('express');
const router = express.Router();
const otherController = require('./other.controller');

router.route('/generate-token').post(otherController.generateTokenForIphone);

module.exports = router;
