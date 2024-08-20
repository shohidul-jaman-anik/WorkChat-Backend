const express = require('express');
const router = express.Router();
const streamingController = require('./streaming.controller');

router
  .route('/get-token/:userId')
  .get(streamingController.autioVideoStreamingController);

module.exports = router;
