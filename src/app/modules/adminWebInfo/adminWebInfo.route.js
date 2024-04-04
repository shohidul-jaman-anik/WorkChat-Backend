const express = require('express');
const router = express.Router();
const webInfoController = require('./adminWebInfo.controller');
// const { validateRequest } = require('../../middlewares/validateRequest/validateRequest');


router
    .route('/:id')
    .get(webInfoController.getAdminWebInfoById)
    .put(webInfoController.updateAdminWebInfo)
    .delete(webInfoController.deleteAdminWebInfo);

router.route('/')
    .get(webInfoController.getAllAdminWebInfo)
    .post(webInfoController.addAdminWebInfo);

module.exports = router;
