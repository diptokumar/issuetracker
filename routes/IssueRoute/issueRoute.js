const express = require('express');
const issueController = require('../../controllers/IssueController/issueController');
const authController = require('../../controllers/authController');
const router = express.Router();


// Protect all routes after this middleware
router.use(authController.protect);


// router.route('/updatesetroute/:userid/:routeid').get(routeController.removesetroute)

router
    .route('/issuehistory')
    .get( issueController.getIssuesHistory)

router
    .route('/issuehistory-monthly')
    .get( issueController.getschollomonthlyissueHistory)


router
    .route('/')
    // .get( pjpController.getTodayPjp)
    .post( issueController.createIssue);

router
    .route('/:id')
    .get(issueController.getsingleIssueDetails)
    .patch( issueController.updateIssueStatus)
    // .delete( routeController.deleteroute);
module.exports = router;