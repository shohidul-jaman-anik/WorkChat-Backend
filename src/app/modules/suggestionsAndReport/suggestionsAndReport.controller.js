const httpStatus = require('http-status');
const { catchAsync } = require('../../../shared/catchAsync');
const {
  addSuggestionAndReportServices,
  getSuggestionAndReportServices,
  deleteSuggestionAndReportServices,
  getSuggestionAndReportByIdServices,
} = require('./suggestionsAndReport.service');
const { sendResponse } = require('../../../shared/sendResponse');

module.exports.addSuggestionAndReport = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await addSuggestionAndReportServices(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully Added',
    data: result,
  });
});

module.exports.getSuggestionAndReport = catchAsync(async (req, res) => {
  const result = await getSuggestionAndReportServices();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Suggestion & Report Successfully',
    data: result,
  });
});

module.exports.getSuggestionAndReportById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSuggestionAndReportByIdServices(id);
  // console.log(result, 'SuggestionAndReport dataaa');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Suggestion & Report By id',
    data: result,
  });
});

exports.deleteSuggestionAndReport = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteSuggestionAndReportServices(id);

  if (!result.deletedCount) {
    return res.status(400).json({
      status: 'fail',
      error: "Could't delete the Suggestion & Report",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Suggestion & Report Delete Successfully',
    data: result,
  });
});
