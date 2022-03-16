const express = require('express');
const divisionController = require('./../../controllers/GeoController/divisionController');
const authController = require('../../controllers/authController');
const router = express.Router();

// Protect all routes after this middleware
//router.use(authController.protect);

// router.
//     route('/getAllDivision').get(authController.restrictTo('ADMIN', 'ORG'), divisionController.getAllDivision)

// router
//     .route('/')
//     .post(authController.restrictTo('ADMIN', 'ORG'), divisionController.createDivision);

router
    .route('/')
    .post(divisionController.createDivision);


// router
//     .route('/:id')
//     .get(authController.restrictTo('ADMIN', 'ORG'), divisionController.getDivisionById)
//     .patch(authController.restrictTo('ADMIN', 'ORG'), divisionController.updateDivision)
//     .delete(authController.restrictTo('ADMIN', 'ORG'), divisionController.deleteDivision);
module.exports = router;