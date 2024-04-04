const express = require('express');
const { adminController } = require('./admin.controller');
const { authController } = require('../auth/auth.controller');
const router = express.Router();


router.route('/updateUserRole/:id').put(adminController.updateUserRole);

router.route('/deleteUser/:id').delete(adminController.deleteUser);


router
  .route('/allUsers')
  .get(authController.verifyAdmin, adminController.getAllUsers);

router.route('/getAdmin/:id').get(authController.verifyAdmin, adminController.getAdmin);



module.exports = router;
