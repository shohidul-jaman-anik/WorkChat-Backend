const httpStatus = require('http-status');
const { catchAsync } = require('../../../shared/catchAsync');
const { generateTokenForIphoneService } = require('./other.service');
const { sendResponse } = require('../../../shared/sendResponse');

module.exports.generateTokenForIphone = catchAsync(async (req, res) => {
  const result = await generateTokenForIphoneService();

  console.log(result, 'resultttt');

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Add Note Successfully',
    data: result,
  });
});
