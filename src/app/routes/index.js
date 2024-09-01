const express = require('express');
const router = express.Router();

const authRoute = require('../../app/modules/auth/auth.route');
const adminRoute = require('../../app/modules/admin/admin.route');
const forumRoute = require('../../app/modules/forum/forum.route');
const suggestionAndReportRoute = require('../../app/modules/suggestionsAndReport/suggestionsAndReport.route');
const chatRoute = require('../../app/modules/chat/chat.route');
const messageRoute = require('../../app/modules/message/message.route');
const notificationRoute = require('../../app/modules/notification/notification.route');
const adminWebInfoRoute = require('../../app/modules/adminWebInfo/adminWebInfo.route');
const taskRoute = require('../../app/modules/task/task.route');
const noteRoute = require('../../app/modules/notes/notes.route');
const streamingRoute = require('../../app/modules/streaming/streaming.route');
const othersRoute = require('../../app/modules/others/others.route');

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/admin/activity',
    route: adminRoute,
  },
  {
    path: '/forum',
    route: forumRoute,
  },

  {
    path: '/suggestionAndReport',
    route: suggestionAndReportRoute,
  },

  {
    path: '/chat',
    route: chatRoute,
  },
  {
    path: '/message',
    route: messageRoute,
  },
  {
    path: '/notification',
    route: notificationRoute,
  },
  {
    path: '/adminWebInfo',
    route: adminWebInfoRoute,
  },
  {
    path: '/task',
    route: taskRoute,
  },
  {
    path: '/note',
    route: noteRoute,
  },
  {
    path: '/streaming',
    route: streamingRoute,
  },
  {
    path: '/others',
    route: othersRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

module.exports = router;
