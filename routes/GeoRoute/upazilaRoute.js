const express = require('express');
const upazilaController = require('./../../controllers/GeoController/upazilaController');
const authController = require('../../controllers/authController');
const router = express.Router();


// Protect all routes after this middleware
//router.use(authController.protect);
// router.route('/territory/:orgid').get(authController.restrictTo('ADMIN', 'ORG'), upazilaController.getallorgterritory)
// router.route('/orgteritory').get(authController.restrictTo('ADMIN', 'ORG'), upazilaController.getallareaterritory)

// router.route('/userareaterritory').get(upazilaController.getuserareaterritory)
// router.route('/get-territory-under-area/:areaid').get(upazilaController.getterritoryunderarea)

router
    .route('/')
    //.get(authController.restrictTo('ADMIN', 'ORG'), upazilaController.getallterritory)
    //.post(authController.restrictTo('ADMIN', 'ORG'), upazilaController.createUpazila);
    .post(upazilaController.createUpazila);

// router
//     .route('/:id')
//     .get(authController.restrictTo('ADMIN', 'ORG'), upazilaController.getsingleterritory)
//     .patch(authController.restrictTo('ADMIN', 'ORG'), upazilaController.updateterritory)
//     .delete(authController.restrictTo('ADMIN', 'ORG'), upazilaController.deleteterritory);
module.exports = router;