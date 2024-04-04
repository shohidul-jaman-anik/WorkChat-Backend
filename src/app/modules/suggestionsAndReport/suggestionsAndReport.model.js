const mongoose = require('mongoose');
// const validator = require("validator");

const suggestionAndReportSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    type: {
      type: String,
      enum: ['Feedback', 'Issue','Suggestion','Report']
    }, // Feedback or Issue
    message: {
      type: String,
      required: true,
    },
    resolved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const SuggestionsAndReport = mongoose.model(
  'Sugg-And-Report',
  suggestionAndReportSchema,
);

module.exports = SuggestionsAndReport;
