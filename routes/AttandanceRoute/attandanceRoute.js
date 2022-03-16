const express = require('express');
const attendanceController = require('../../controllers/AttendanceController/AttandanceController');
const authController = require('../../controllers/authController');
const { uploadS3 } = require('../../middleware/multer');
const router = express.Router();

router
    .route('/downloadallattendace')
    .get(attendanceController.downloadallattendace)

// Protect all routes after this middleware
router.use(authController.protect );

router
    .route('/todaydayclose')
    .patch(authController.restrictTo('SO','SS', 'TO', 'RBH'), attendanceController.dayclose)

router
    .route('/todayattendanceuser/:dateid')
    .get(attendanceController.todayusercheckAttandace)

router
    .route('/datewiseattendance/:dateid')
    .get(attendanceController.datewiseuserscheckAttandace)

router.route('/myattendanceMonthly/:month').get(
    attendanceController.getMyAttendanceMonthly
);

router
    .route('/todaydayclosecheck')
    .get(authController.restrictTo('SO','SS', 'TO', 'RBH'), attendanceController.daycloseCheck)

router
    .route('/')
    .get(authController.restrictTo('ADMIN', 'ORG', 'SO'),  attendanceController.getallAttendance)
    .post(authController.restrictTo('ADMIN', 'ORG','SO','SS', 'TO', 'RBH'), uploadS3.single('photo'),attendanceController.createAttendance);

router
    .route('/chcekAttandance')
    .get(authController.restrictTo('ADMIN', 'ORG','SO','SS','TO', 'RBH'), attendanceController.checkAttandace)

router
    .route('/userundercheckattendancce')
    .get( attendanceController.srattendancegivennotgiven)

router
    .route('/toattendancegivennotgivenSR')
    .get( attendanceController.toattendancegivennotgivenSR)

router
    .route('/toattendancegivennotgivenSS')
    .get( attendanceController.toattendancegivennotgivenSS)


router
    .route('/rbhattendancegivennotgivenSR')
    .get( attendanceController.rbhattendancegivennotgivenSR)

router
    .route('/rbhattendancegivennotgivenSS')
    .get( attendanceController.rbhattendancegivennotgivenSS)

router
    .route('/rbhattendancegivennotgivenTO')
    .get( attendanceController.rbhattendancegivennotgivenTO)




router
    .route('/getUserAttendance')
    .get(authController.restrictTo('ADMIN', 'ORG','SO','SS', 'TO', 'RBH'), attendanceController.getUserAttendance)    
router
    .route('/chcekAttandanceLate')
    .get(authController.restrictTo('ADMIN', 'ORG','SO','SS', 'TO', 'RBH'), attendanceController.checkAttandaceLate)
router
    .route('/:id')
    .get(authController.restrictTo('ADMIN', 'ORG','SO','SS', 'TO', 'RBH'), attendanceController.getsingleAttendance)
    .patch(authController.restrictTo('ADMIN', 'ORG', 'SO','SS', 'TO', 'RBH'), uploadS3.single('photo'), attendanceController.updateAttendance)
    .delete(authController.restrictTo('ADMIN', 'ORG','SO','SS', 'TO', 'RBH'), attendanceController.deleteAttendance);
module.exports = router;