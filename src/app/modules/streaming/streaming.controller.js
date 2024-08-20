const httpStatus = require('http-status');
const { sendResponse } = require('../../../shared/sendResponse');
const { catchAsync } = require('../../../shared/catchAsync');
const { autioVideoStreamingService } = require('./streaming.service');


module.exports.autioVideoStreamingController = catchAsync(async (req, res) => {

  const userId = req.params?.userId;


  const result = await autioVideoStreamingService(userId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Generate auth token for streaming',
    data: result,
  });
});
