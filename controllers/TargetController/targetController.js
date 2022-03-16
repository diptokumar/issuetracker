const catchAsync = require('../../utils/catchAsync')
const TargetModel = require('../../models/TargetModel/targetModel')
const moment = require('moment');
const mongoose = require('mongoose');
const UserModel = require('../../models/UserModel/userModel')
const ResultModel = require('../../models/QuestionModel/resultSurveyModel')

function percentage(a,b){
    return ((a/b)*100);
}


exports.createTarget = catchAsync(async (req, res, next) => {

    const usertarget = await TargetModel.create({
        ...req.body
    });
    res.status(201).json({
            status: 'success',
            message: 'monthly target created',
            usertarget
        })
})



exports.trackActivity = catchAsync(async (req, res, next) => {

    const today = moment().format('DD-MM-YYYY');
    const month = moment().format('MM-YYYY');
    let target, totaltarget, totalsurvey,survey,surveytoOne,
    totalconnection,totalconnectiontoOne, surveyPercentage, conncectionPercentage,
    surveyPercentagetoOne, conncectionPercentagetoOne, totalacheivement, 
    totalacheivementtoOne;

    let {activityType} = req.query

    if(activityType === 'daily') {
        target = await TargetModel.findOne({  
            user: req.user._id,
            // today: today,
            month: month
        });
        
        totaltarget = target.actualTarget/26;
        // console.log(todaytotaltarget);
        totalsurvey = await ResultModel.aggregate([
            {
                $match: {
                    user: req.user._id,
                    date: today
                }
            },
            {
                $group: {
                    _id: null,
                    totalsurvey: {$sum: 1},
                    connection: {
                        $sum: { $cond: { if: { $eq: [ "$infocollect", 1 ] }, then: 1, else: 0 }}
                    }
                }
            }
        ]);
    }else if(activityType === 'monthly') {
        target = await TargetModel.findOne({  
            user: req.user._id,
            // today: today,
            month: month
        });
        
        totaltarget = target.actualTarget;
        // console.log(todaytotaltarget);
        totalsurvey = await ResultModel.aggregate([
            {
                $match: {
                    user: req.user._id,
                    // date: today   //have to fixed
                }
            },
            {
                $group: {
                    _id: null,
                    totalsurvey: {$sum: 1},
                    connection: {
                        $sum: { $cond: { if: { $eq: [ "$infocollect", 1 ] }, then: 1, else: 0 }}
                    }
                }
            }
        ]);
    } else if(activityType === 'todate') {
        target = await TargetModel.findOne({  
            user: req.user._id,
            // today: today,
          
        });
        
        totaltarget = target.actualTarget;
        // console.log(todaytotaltarget);
        totalsurvey = await ResultModel.aggregate([
            {
                $match: {
                    user: req.user._id,
                    // date: today   //have to fixed
                }
            },
            {
                $group: {
                    _id: null,
                    totalsurvey: {$sum: 1},
                    connection: {
                        $sum: { $cond: { if: { $eq: [ "$infocollect", 1 ] }, then: 1, else: 0 }}
                    }
                }
            }
        ]);
    }


    if(totalsurvey.length=== 0) {
        survey = 0;
        totalconnection = 0;
    }else{
        totalsurvey[0].totalsurvey?  survey= totalsurvey[0].totalsurvey: survey = 0
        totalsurvey[0].connection?  totalconnection= totalsurvey[0].connection: totalconnection = 0
    }

    // console.log(survey, totalconnection, totaltarget)
    surveyPercentage = percentage(survey,totaltarget);
    // console.log(surveyPercentage);
    conncectionPercentage = percentage(totalconnection,survey);

    totalacheivement = percentage(totalconnection, totaltarget);

    totalconnectiontoOne = totalconnection/100;

    surveyPercentagetoOne = surveyPercentage/100;

    conncectionPercentagetoOne = conncectionPercentage / 100;

    totalacheivementtoOne = totalacheivement/100;
    

     if(surveytoOne>1){
        surveytoOne = 1;
        surveyPercentage = 100
     }
     if(totalconnectiontoOne>1){
        totalconnectiontoOne = 1
        totalconnection = 100
     }
     surveyPercentage = surveyPercentage.toFixed(2)
     surveyPercentage = parseFloat(surveyPercentage)

     surveyPercentagetoOne = surveyPercentagetoOne.toFixed(3)
     surveyPercentagetoOne = parseFloat(surveyPercentagetoOne)



     conncectionPercentage = conncectionPercentage.toFixed(2)
     conncectionPercentage = parseFloat(conncectionPercentage)


     conncectionPercentagetoOne = conncectionPercentagetoOne.toFixed(3)
     conncectionPercentagetoOne = parseFloat(conncectionPercentagetoOne)


     totalacheivement = totalacheivement.toFixed(2);
     totalacheivement= parseFloat(totalacheivement);



     totalacheivementtoOne = totalacheivementtoOne.toFixed(3);
     totalacheivementtoOne= parseFloat(totalacheivementtoOne);


     totaltarget = Math.ceil(totaltarget);
    //  totaltarget= parseFloat(totaltarget);
    
    if(conncectionPercentage === null || conncectionPercentage === undefined || !isFinite(conncectionPercentage) || isNaN(conncectionPercentage)){
        conncectionPercentage = 0;
        conncectionPercentagetoOne = 0;
      }

     res.status(200).json({
         status: 'success',
         survey,
         surveyPercentage,
         surveyPercentagetoOne,
         totalconnection,
         conncectionPercentage,
         conncectionPercentagetoOne,
         totaltarget,
         totalacheivement,
         totalacheivementtoOne
     })
})