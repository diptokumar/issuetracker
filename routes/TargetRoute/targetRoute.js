const express = require('express');
const router = express.Router();
const TargetController = require('../../controllers/TargetController/targetController');
const authController = require('../../controllers/authController');

router.use(authController.protect );



router
    .route('/createtarget')
    .post( TargetController.createTarget)

router.route('/track-Activity').get( TargetController.trackActivity)

module.exports = router;