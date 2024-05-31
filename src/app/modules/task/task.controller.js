const httpStatus = require('http-status');
const {
  addTaskServices,
  getTaskServiceById,
  updateTaskService,
  deleteTaskService,
  getAllTaskServiceById,
  bulkDeleteTaskService,
} = require('./task.service');
const { catchAsync } = require('../../../shared/catchAsync');
const { sendResponse } = require('../../../shared/sendResponse');
const { default: mongoose } = require('mongoose');

module.exports.addTask = catchAsync(async (req, res) => {
  // console.log(req.body, "blog dataaaa");
  const data = req.body;
  const userId = req.body.userId;
  const result = await addTaskServices(userId, data);
  
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Add Task Successfully',
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
    message: 'Successfully Get all task ',
    data: result,
  });
});

module.exports.getTaskById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id, 'taskk idddd');

  const result = await getTaskServiceById(id);
  res.status(200).json({
    status: 'Success',
    message: 'Get task by id successfully',
    data: result,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Add Tenent Contract By Id Successfully',
    data: result,
  });
});

exports.updateTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await updateTaskService(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task Update Successfully',
    data: result,
  });
});

exports.deleteTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteTaskService(id);

  if (!result.deletedCount) {
    return res.status(400).json({
      status: 'fail',
      error: "Could't delete the task",
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