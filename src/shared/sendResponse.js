module.exports.sendResponse = (res, data) => {
    const sendResponse = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null || undefined,
    };
    res.status(data.statusCode).json(sendResponse);
};

