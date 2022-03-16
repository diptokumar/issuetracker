const express = require('express');
const routeController = require('./../../controllers/RouteController/routeController');
const authController = require('../../controllers/authController');
const router = express.Router();


// Protect all routes after this middleware
router.use(authController.protect);
router.route('/router/:orgid').get(authController.restrictTo('ADMIN', 'ORG'), routeController.getallorgroute)

router.route('/routepagination').get(authController.restrictTo('ADMIN', 'ORG'), routeController.routepaginandsearch)

router.route('/bestsellingshop/:route').get(authController.restrictTo('ADMIN', 'ORG'), routeController.bestsellingshop)

router.route('/allrouteshop/:route').get(authController.restrictTo('ADMIN', 'ORG'), routeController.allrouteshop)

router.route('/yearlyroute/:route').get(authController.restrictTo('ADMIN', 'ORG'), routeController.yearlydata)

router.route('/updatesetroute/:userid/:routeid').get(routeController.removesetroute)



router
    .route('/')
    .get(authController.restrictTo('ADMIN', 'ORG','SR'), routeController.getallroute)
    .post(authController.restrictTo('ADMIN', 'ORG','SR'), routeController.createroute);

router
    .route('/userRoute')
    .get(authController.restrictTo('ADMIN', 'ORG','SR', 'DP','SS'), routeController.getUserRoute)

router
    .route('/userallroute/:userid')
    .get(authController.restrictTo('ADMIN', 'ORG','SR', 'DP','SS', 'TO', 'RBH'), routeController.getallusersroute)


router
    .route('/geoRoute/:geoId')
    .get(authController.restrictTo('ADMIN', 'ORG'), routeController.getRouteGeo)
router
    .route('/usersDp/:routeId')
    .get(authController.restrictTo('ADMIN', 'ORG','SR'), routeController.getDpRoute)
router
    .route('/:id')
    .get(authController.restrictTo('ADMIN', 'ORG','SR'), routeController.getsingleroute)
    .patch(authController.restrictTo('ADMIN', 'ORG','SR'), routeController.updateroute)
    .delete(authController.restrictTo('ADMIN', 'ORG','SR'), routeController.deleteroute);
module.exports = router;