const express = require('express');
const userController = require('./../../controllers/UserController/userController');
const authController = require('../../controllers/authController');
const router = express.Router();
const { uploadS3 } = require('../../middleware/multer');


router.get('/test', userController.daterangequery);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
router.patch('/updatelan/:id', authController.updateLanLot);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.use(authController.protect );

router.route('/setrouteforusers/:userid').patch(authController.restrictTo('ADMIN', 'ORG'), userController.setrouteforuser)
router.route('/userpaging').get(authController.restrictTo('ADMIN', 'ORG'), userController.userPagination)



router.route('/allusers/:orgid').get(authController.restrictTo('ADMIN', 'ORG'), userController.getAllOrgUsers)
router.route('/orgusers/:orgid/:role').get(authController.restrictTo('ADMIN', 'ORG'), userController.getAllfilterusers)
router.route('/usertosolist').get(userController.usertosolist)

router.route('/linemanagerid/:role').get(authController.restrictTo('ADMIN', 'ORG','DISTRIBUTOR'), userController.linemanagerSelect)

router.route('/userunderyou').get(userController.yourunderUserlist)

router.route('/solistunderss/:ssid').get(userController.solistunderss)

router.route('/sslistunderto/:toId').get(userController.userToSSlist)

router.route('/solistunderto/:toId').get(userController.userToSRlist)

router.route('/usersslistunderrbh').get(userController.userSSlistunderRbh)

router.route('/usersolistunderrbh').get(userController.userSolistunderRbh)


router
  .route('/')
  .get(userController.getAllUsers)
  .post(uploadS3.single('photo'), userController.saveUser);

router
  .route('/:id',)
  .get(authController.restrictTo('ADMIN', 'ORG'),userController.getUser)
  .patch(authController.restrictTo('ADMIN', 'ORG'), userController.updateMe)
  .delete(authController.restrictTo('ADMIN', 'ORG'),userController.deleteUser);

module.exports = router;
