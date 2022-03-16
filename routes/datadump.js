const express = require('express');
const dataController = require('../controllers/datadumpControler');
// const authController = require('../../controllers/authController');
const router = express.Router();


// Protect all routes after this middleware
// router.use(authController.protect );

router.route('/area').post(dataController.excelarea)

// // router
// //     .route('/')
// //     .get(authController.restrictTo('ADMIN', 'ORG','SR'), unitController.getallUnit)
// //     .post(authController.restrictTo('ADMIN', 'ORG','SR'), unitController.createUnit);

// // router
// //     .route('/:id')
// //     .get(authController.restrictTo('ADMIN', 'ORG','SR'), unitController.getsingleUnit)
// //     .patch(authController.restrictTo('ADMIN', 'ORG','SR'), unitController.updateUnit)
// //     .delete(authController.restrictTo('ADMIN', 'ORG','SR'), unitController.deleteUnit);

module.exports = router; 