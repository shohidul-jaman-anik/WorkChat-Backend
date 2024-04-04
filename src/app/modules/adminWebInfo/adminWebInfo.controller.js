const httpStatus = require('http-status');
const { catchAsync } = require('../../../shared/catchAsync');
const { sendResponse } = require('../../../shared/sendResponse');
const { addAdminWebInfoServices, deleteAdminWebInfoServices, getAdminWebInfoByIdServices, getAdminWebInfoServices, updateAdminWebInfoService } = require('./adminWebInfo.service');

module.exports.addAdminWebInfo = catchAsync(async (req, res) => {
    const data = req.body;
  
    const result = await addAdminWebInfoServices(data);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Add Web Info Successfully',
        data: result,
    });
});

module.exports.getAllAdminWebInfo = catchAsync(async (req, res) => {
    const result = await getAdminWebInfoServices();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Get all Web Info ',
        data: result,
    });
});

module.exports.getAdminWebInfoById = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(id, 'Web Info idddd');

    const result = await getAdminWebInfoByIdServices(id);
    res.status(200).json({
        status: 'Success',
        message: 'Get Web Info by id successfully',
        data: result,
    });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Add Web Info By Id Successfully',
        data: result,
    });
});

exports.updateAdminWebInfo = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await updateAdminWebInfoService(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Web Info Update Successfully',
        data: result,
    });
});

exports.deleteAdminWebInfo = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await deleteAdminWebInfoServices(id);

    if (!result.deletedCount) {
        return res.status(400).json({
            status: 'fail',
            error: "Could't delete the Web Info",
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Web Info Delete Successfully',
        data: result,
    });
});