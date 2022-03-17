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
    .patch( attendanceController.dayclose)

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
    .get( attendanceController.daycloseCheck)

router
    .route('/')
    .get( attendanceController.getallAttendance)
    .post( uploadS3.single('photo'),attendanceController.createAttendance);

router
    .route('/chcekAttandance')
    .get( attendanceController.checkAttandace)

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
    .get( attendanceController.getUserAttendance)    
router
    .route('/chcekAttandanceLate')
    .get( attendanceController.checkAttandaceLate)
router
    .route('/:id')
    .get( attendanceController.getsingleAttendance)
    .patch( uploadS3.single('photo'), attendanceController.updateAttendance)
    .delete( attendanceController.deleteAttendance);
module.exports = router;