const express = require('express');
const areaController = require('./../../controllers/GeoController/areaController');
const authController = require('../../controllers/authController');
const router = express.Router();


// Protect all routes after this middleware
router.use(authController.protect );
router.route('/orgarea/:orgid').get(authController.restrictTo('ADMIN', 'ORG'), areaController.getallorgarea)

router.route('/orgareaquery').get(authController.restrictTo('ADMIN', 'ORG'), areaController.getallregionarea)


router
    .route('/')
    .get(authController.restrictTo('ADMIN', 'ORG'), areaController.getallarea)
    .post(authController.restrictTo('ADMIN', 'ORG'), areaController.createarea);

router
    .route('/:id')
    .get(authController.restrictTo('ADMIN', 'ORG'), areaController.getsinglearea)
    .patch(authController.restrictTo('ADMIN', 'ORG'), areaController.updatearea)
    .delete(authController.restrictTo('ADMIN', 'ORG'), areaController.deletearea);
module.exports = router;