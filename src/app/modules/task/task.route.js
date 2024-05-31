const express = require('express');
const router = express.Router();
const taskController = require('./task.controller');
const { validateRequest } = require('../../middlewares/validateRequest/validateRequest');
const taskValidationSchema = require('./task.validation');



router.route('/alltask/:userId').get(taskController.getAllTask);

router.route('/bulk-delete').delete(taskController.bulkDeleteTask)

router
  .route('/:id')
  .get(taskController.getTaskById)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

router.route('/').post(validateRequest(taskValidationSchema), taskController.addTask);


module.exports = router;
