const express = require('express');
const router = express.Router();
const taskController = require('./task.controller');
const { validateRequest } = require('../../middlewares/validateRequest/validateRequest');
const taskValidationSchema = require('./task.validation');
const { authController } = require('../auth/auth.controller');



router.route('/alltask/:userId').get(authController.ProtectCommonRoute, taskController.getAllTask);

router.route('/bulk-delete').delete(authController.ProtectCommonRoute, taskController.bulkDeleteTask)

router
  .route('/:id')
  .get(taskController.getTaskById)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

router.route('/').post(authController.ProtectCommonRoute, validateRequest(taskValidationSchema), taskController.addTask);


module.exports = router;
