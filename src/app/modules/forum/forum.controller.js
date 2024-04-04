const httpStatus = require('http-status');
const { catchAsync } = require('../../../shared/catchAsync');
const { sendResponse } = require('../../../shared/sendResponse');
const pick = require('../../middlewares/other/pick');
const { paginationFields } = require('./forum.constant');
const {
  deleteCommentServices,
  getCommnetService,
  getForumService,
  getForumServiceById,
  getForumServiceByEmail,
  updateForumService,
  deleteForumService,
  getForumSuggestionService,
  addUserForumActivityServices,
} = require('./forum.service');
const { addForumServices } = require('./forum.service');

module.exports.addForum = catchAsync(async (req, res) => {
  // console.log(req.body, "blog dataaaa");

  const data = req.body;
  const result = await addForumServices(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Add Forum Successfully',
    data: result,
  });
});

module.exports.getForum = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'category']);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await getForumService(filters, paginationOptions);
  // const result = await getBlogService(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Forum Successfully',
    data: result,
  });
});

module.exports.getForumById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id, 'blog idddd');

  const result = await getForumServiceById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Forum by id Successfully',
    data: result,
  });
});

module.exports.getForumByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  console.log(email, 'blog email');

  const result = await getForumServiceByEmail(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Forum by email Successfully',
    data: result,
  });
});

exports.updateForum = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await updateForumService(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Forum Successfully',
    data: result,
  });
});

exports.deleteForum = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteForumService(id);

  if (!result.deletedCount) {
    return res.status(400).json({
      status: 'fail',
      error: "Could't delete the forum",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Forum Delete Successfully',
    data: result,
  });
});

module.exports.getForumSuggestion = catchAsync(async (req, res) => {
  const { suggestion } = req.params;
  // console.log(suggestion, 'suggestion suggestion')

  const result = await getForumSuggestionService(suggestion);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Forums suggestion Successfully',
    data: result,
  });
});

module.exports.addUserForumActivity = catchAsync(async (req, res) => {
  // console.log(req.body, "dataaaa")
  // const { id } = req.params
  const data = req.body;
  // console.log(data, "dataaaa")
  const result = await addUserForumActivityServices(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully Added',
    data: result,
  });
});

module.exports.getComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  // const data = (req.body)
  // console.log(commentId, "commentIddddddd");
  const result = await getCommnetService(commentId);
  // console.log(result, 'comments dataaa')

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Comment Successfully',
    data: result,
  });
});

exports.deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteCommentServices(id);

  if (!result.deletedCount) {
    return res.status(400).json({
      status: 'fail',
      error: "Could't delete the Comment",
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Delete Comment Successfully',
    data: result,
  });
});
