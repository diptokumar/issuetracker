const express = require('express');
const instituteController = require('../../controllers/InstituteController/instituteController');
const authController = require('../../controllers/authController');
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
//router.route('/district').get(authController.restrictTo('ADMIN', 'ORG'), instituteController.getallorgregion)

router
    .route('/')
    //.get(authController.restrictTo('ADMIN', 'ORG'), instituteController.getallregion)
    //.post(authController.restrictTo('ADMIN', 'ORG'), instituteController.createInstitute);
    .post(instituteController.createInstitute);

router
    .route('/:id')
    .get(instituteController.getsingleInistitureDetails)
//     .patch(authController.restrictTo('ADMIN', 'ORG'), instituteController.updateregion)
//     .delete(authController.restrictTo('ADMIN', 'ORG'), instituteController.deleteregion);
module.exports = router;