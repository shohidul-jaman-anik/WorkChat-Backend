const express = require('express');
const router = express.Router();
const suggestionAndReportController = require('./suggestionsAndReport.controller');
const { validateRequest } = require('../../middlewares/validateRequest/validateRequest');
const SuggestionAndReportValidation = require('./SuggestionsAndReport.validation');

router
  .route('/:id')
  .get(suggestionAndReportController.getSuggestionAndReportById)
  .delete(suggestionAndReportController.deleteSuggestionAndReport);

router
  .route('/')
  .get(suggestionAndReportController.getSuggestionAndReport)
  .post(validateRequest(SuggestionAndReportValidation), suggestionAndReportController.addSuggestionAndReport);

module.exports = router;
