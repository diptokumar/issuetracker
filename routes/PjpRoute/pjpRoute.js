const express = require('express');
const pjpController = require('../../controllers/PjpController/pjpController');
const authController = require('../../controllers/authController');
const router = express.Router();


// Protect all routes after this middleware
router.use(authController.protect);


// router.route('/updatesetroute/:userid/:routeid').get(routeController.removesetroute)



router
    .route('/')
    .get( pjpController.getTodayPjp)
    .post( pjpController.createPjp);


// router
//     .route('/:id')
    // .get(routeController.getsingleroute)
    // .patch( routeController.updateroute)
    // .delete( routeController.deleteroute);
module.exports = router;