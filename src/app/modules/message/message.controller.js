const httpStatus = require('http-status');
const { catchAsync } = require('../../../shared/catchAsync');
const { sendResponse } = require('../../../shared/sendResponse');
const MessageModel = require('./messageModel');

module.exports.addMessage = catchAsync(async (req, res) => {
  const { chatId, senderId, text, images } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
    images,
  });

  const result = await message.save();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Send message successfully',
    data: result,
  });
});

module.exports.getMessages = catchAsync(async (req, res) => {
  const { chatId } = req.params;

  const result = await MessageModel.find({ chatId });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get message successfully',
    data: result,
  });
});

module.exports.deleteMessage = catchAsync(async (req, res) => {
  const id = req.params.id;
  const deleteUniqueMessage = await MessageModel.findByIdAndDelete(id);
  const deletedChat = await MessageModel.deleteMany({ chatId: id });

  if (!deletedChat || !deleteUniqueMessage) {
    return res.status(404).json({ message: 'Message not found' });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Message deleted successfully',
    data: deletedChat,
  });
});

// Update message:-
module.exports.EditMessage = catchAsync(async (req, res) => {
  const messageId = req.params.id;
  const newText = req.body.text;

  const updatedMessage = await MessageModel.findByIdAndUpdate(
    messageId,
    { text: newText },
    { new: true },
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Edit message Successfully',
    data: updatedMessage,
  });
});
