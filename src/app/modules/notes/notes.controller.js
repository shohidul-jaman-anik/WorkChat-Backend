const httpStatus = require('http-status');
const {
  addTaskServices,
  getTaskServiceById,
  updateTaskService,
  deleteTaskService,
  getAllTaskServiceById,
  bulkDeleteTaskService,
} = require('./notes.service');
// const { catchAsync } = require('../../../shared/catchAsync');
// const { sendResponse } = require('../../../shared/sendResponse');
const { default: mongoose } = require('mongoose');
const { sendResponse } = require('../../../shared/sendResponse');
const { catchAsync } = require('../../../shared/catchAsync');




module.exports.addTask = catchAsync(async (req, res) => {
  // console.log(req.body, "blog dataaaa");
  const data = req.body;
  const userId = req.body.userId;
  const result = await addTaskServices(userId, data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Add Note Successfully',
    data: result,
  });
});

module.exports.getAllTask = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  console.log(userId, 'all taskk userId');
  const result = await getAllTaskServiceById(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all notes',
    data: result,
  });
});

module.exports.getTaskById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id, 'taskk idddd');

  const result = await getTaskServiceById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get note by id successfully',
    data: result,
  });
});

exports.updateTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await updateTaskService(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Note Update Successfully',
    data: result,
  });
});

exports.deleteTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteTaskService(id);

  if (!result.deletedCount) {
    return res.status(400).json({
      status: 'fail',
      error: "Could't delete the note",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Task Delete Successfully',
    data: result,
  });
});


exports.bulkDeleteTask = catchAsync(async (req, res) => {

  const ids = req.body?.ids || [];
  console.log(ids, 'controller idddddddddddd');

  // Validate IDs
  if (!ids.every(id => mongoose.Types.ObjectId.isValid(id))) {
    throw { message: "Invalid IDs provided" };
  }

  const result = await bulkDeleteTaskService(ids);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Task Delete Successfully ',
    data: result,
  });
});


