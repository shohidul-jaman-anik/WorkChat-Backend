const httpStatus = require('http-status');
const { catchAsync } = require('../../../shared/catchAsync');
const { sendResponse } = require('../../../shared/sendResponse');
const ChatModel = require('./chatModel');

module.exports.createChat = catchAsync(async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderEmail, req.body.receiverEmail],
  });

  const result = await newChat.save();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Chat Successfully',
    data: result,
  });
});

module.exports.userChats = catchAsync(async (req, res) => {
  const chat = await ChatModel.find({
    members: { $in: [req.params.userEmail] },
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Chat Successfully',
    data: chat,
  });
});

module.exports.deleteChat = catchAsync(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const deleteUniqueChat = await ChatModel.findByIdAndDelete(id);

  if (!deleteUniqueChat) {
    return res.status(404).json({ message: 'Chat not found' });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chat deleted successfully',
    // data: chat,
  });
});
