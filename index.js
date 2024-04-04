const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const router = require('./src/app/routes/index');
const httpStatus = require('http-status');
require('dotenv').config();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');
const config = require('./config');
const globalErrorHandler = require('./src/app/middlewares/globalErrorHandler/globalErrorHandler');
const helmet = require("helmet");
const toobusy = require('toobusy-js');


// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');


// Helmet middleware for security headers
app.use(helmet());

// Add more Helmet middleware with specific configurations
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
    styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
    fontSrc: ["'self'", 'fonts.gstatic.com'],
    imgSrc: ["'self'", 'data:'],
    connectSrc: ["'self'"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
    blockAllMixedContent: [],
    frameAncestors: ["'none'"]
  }
}));

// Set Referrer Policy
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

// Frameguard to prevent clickjacking attacks
app.use(helmet.frameguard({ action: 'deny' }));

// Prevent MIME-sniffing
app.use(helmet.noSniff());

// Enable XSS Protection
app.use(helmet.xssFilter());

// Hide X-Powered-By header
app.use(helmet.hidePoweredBy());

// Disable etags
app.disable('etag');

// For Stop DOS Attack
app.use(function (req, res, next) {
  if (toobusy()) {
    res.send(503, 'Server too busy!');
  } else {
    next();
  }
});


mongoose
  .connect(config.database_local)
  .then(() => console.log('Database connection successfully'.red.bold))
  .catch(err => {
    console.log('Error connecting to the database:', err);
    process.exit(1); // Exit the application on database connection error
  });

app.use('/api/v1', router);
// app.use('/images', express.static('images'));
app.use(globalErrorHandler);

// server
const port = config.port || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

app.get('/', (req, res) => {
  res.send('Route is working! YaY!');
});

// Handle Not Found
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  });
  next();
});

module.exports = app;
