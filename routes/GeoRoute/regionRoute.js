const express = require('express');
const regionController = require('./../../controllers/GeoController/regionController');
const authController = require('../../controllers/authController');
const router = express.Router();


// Protect all routes after this middleware
router.use(authController.protect);
router.route('/region/:orgid').get(authController.restrictTo('ADMIN', 'ORG'), regionController.getallorgregion)

router
    .route('/')
    .get(authController.restrictTo('ADMIN', 'ORG'), regionController.getallregion)
    .post(authController.restrictTo('ADMIN', 'ORG'), regionController.createregion);

router
    .route('/:id')
    .get(authController.restrictTo('ADMIN', 'ORG'), regionController.getsingleregion)
    .patch(authController.restrictTo('ADMIN', 'ORG'), regionController.updateregion)
    .delete(authController.restrictTo('ADMIN', 'ORG'), regionController.deleteregion);
module.exports = router;