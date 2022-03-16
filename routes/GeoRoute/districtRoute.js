const express = require('express');
const districtController = require('./../../controllers/GeoController/districtController');
const authController = require('../../controllers/authController');
const router = express.Router();


// Protect all routes after this middleware
//router.use(authController.protect);
//router.route('/district').get(authController.restrictTo('ADMIN', 'ORG'), districtController.getallorgregion)

router
    .route('/')
    //.get(authController.restrictTo('ADMIN', 'ORG'), districtController.getAllDistrict)
    //.post(authController.restrictTo('ADMIN', 'ORG'), districtController.createDistrict);
    .post(districtController.createDistrict);

// router
//     .route('/:id')
//     .get(authController.restrictTo('ADMIN', 'ORG'), districtController.getDistrictById)
//     .patch(authController.restrictTo('ADMIN', 'ORG'), districtController.updateDistrict)
//     .delete(authController.restrictTo('ADMIN', 'ORG'), districtController.deleteDistrict);
module.exports = router;