const express = require('express');
const electoralSeatController = require('../../controllers/GeoController/electoralSeatController');
const authController = require('../../controllers/authController');
const router = express.Router();


// Protect all routes after this middleware
//router.use(authController.protect);
// router.route('/territory/:orgid').get(authController.restrictTo('ADMIN', 'ORG'), electoralSeatController.getallorgterritory)
// router.route('/orgteritory').get(authController.restrictTo('ADMIN', 'ORG'), electoralSeatController.getallareaterritory)

// router.route('/userareaterritory').get(electoralSeatController.getuserareaterritory)
// router.route('/get-territory-under-area/:areaid').get(electoralSeatController.getterritoryunderarea)

router
    .route('/')
    //.get(authController.restrictTo('ADMIN', 'ORG'), electoralSeatController.getallterritory)
    //.post(authController.restrictTo('ADMIN', 'ORG'), electoralSeatController.createElectoralSet);
    .post(electoralSeatController.createElectoralSet);

// router
//     .route('/:id')
//     .get(authController.restrictTo('ADMIN', 'ORG'), electoralSeatController.getsingleterritory)
//     .patch(authController.restrictTo('ADMIN', 'ORG'), electoralSeatController.updateterritory)
//     .delete(authController.restrictTo('ADMIN', 'ORG'), electoralSeatController.deleteterritory);
module.exports = router;