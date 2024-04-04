const rateLimit = require("express-rate-limit")

module.exports.authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes in milliseconds (1second = 1000ms)
    max: 6, // maximum number of request inside a window
    message: {
        success: false,
        message: "You have exceeded the 6 requests in 5 minutes limit!",
        statusCode: 429,
        data: null
    }, // the message when they exceed limit
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})