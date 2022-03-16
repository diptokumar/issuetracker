const express = require('express');
const router = express.Router();
const QuestionController = require('../../controllers/QuestionController/questionController');
const authController = require('../../controllers/authController');

const { uploadS3 } = require('../../middleware/multer');


router
.route('/dummyimage')
.post(uploadS3.single('photo'), QuestionController.dummyimage)


router.use(authController.protect );

router
    .route('/getQuestions')
    .get( QuestionController.getQuestions)


router
    .route('/verify_otp')
    .post(QuestionController.otpVerification)

    router
    .route('/resend_otp')
    .post(QuestionController.otpResend)
      

router
    .route('/createQuestion')
    .post( QuestionController.createQuestion)


router
    .route('/resultsurvey')
    .post( QuestionController.resultsurvey)

router
    .route('/singleSurvey/:surveyId')
    .get( QuestionController.singleSurvey)

router
    .route('/surveyDatewise/:dateId')
    .get( QuestionController.surveyDatewise)


router
    .route('/infoCollection')
    .post(uploadS3.single('photo'), QuestionController.InfoCollection)





module.exports = router;