const QuestionModel = require('../../models/QuestionModel/questionModel')
const ResultModel = require('../../models/QuestionModel/resultSurveyModel')
const InfoCollectionModel = require('../../models/QuestionModel/infoCollectionModel')
const moment = require('moment')
const catchAsync = require('../../utils/catchAsync')
const axios = require('axios');
const otpGenerator = require('otp-generator')
const dummyImage = require('../../models/imageUpload')


exports.createQuestion = catchAsync(async (req, res, next) => {


    const question = await QuestionModel.create(req.body);
    
    res.status(201).json({
        status: 'success',
        question
    })

})

exports.getQuestions = catchAsync(async (req, res, next) =>{
    const question = await QuestionModel.findOne({
        _id: "622520090d405db40ab65fc9"
    }).select('questions');
    let {questions} = question
    res.status(200).json({
        status: 'success',
        questions
    })

})

exports.resultsurvey = catchAsync(async (req, res, next) => {
    const today = moment().format('DD-MM-YYYY')
    console.log(today);
    console.log(req.body);
    console.log(req.user)
    let questions = [];
    for(let i=0; i<req.body.questions.length;i++){
        let object = {};

        object.options = req.body.questions[i].options;
        object.questionType = req.body.questions[i].questionType;
        object.question = req.body.questions[i].question;
        object.givenanswer = req.body.questions[i].givenanswer;
        questions.push(object)


    }
    const resultsubmit = await ResultModel.create({
        user: req.user._id,
        questions: questions,
        collectionStartTime: req.body.collectionStartTime,
        collectionEndTime: req.body.collectionEndTime,
        date: today
    });
    
    res.status(201).json({
        status: 'success',
        resultsubmit
    })

})


exports.InfoCollection = catchAsync(async (req, res, next) => {
    
    const today = moment().format('DD-MM-YYYY')
    let time = moment().format('HH:mm:ss');

// ResultModel

    // const updateresultModel = await ResultModel.findOneAndUpdate(
    //     { _id: req.body.surveyInfo},{
    //         infocollect: 1,
    //         infocollectID: infoCollection._id
    // },{new: true})

    let otp =  otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
    let randomnumber = otpGenerator.generate(21,{upperCaseAlphabets: false, specialChars: false});

    let loginUrl = 'https://smsplus.sslwireless.com/api/v3/send-sms';
    // let messageBody = "Your OTP-CODE is {value would be}"
    let apiKey = "qy0v9orp-xl7pnvex-v1dm0rgm-fvjadzg0-dttywaou";
    let sid = "MAACOTP"

    const phoneNumberexistOrNotcheck = await InfoCollectionModel.findOne({
        mobileNumber: req.body.mobileNumber
    });

    if(phoneNumberexistOrNotcheck != null) {
        res.status(403).json({
            message: "Phone Number Alreay Exist"
        })
    }else{
    const infoCollection = await InfoCollectionModel.create({...req.body,
        user: req.user._id,
        infotakenDate: today,
        time: time,
        otp: otp,
        photo: req.file.key
    });
   let obj =  {
        "api_token": apiKey,
        "sid": sid,
        "msisdn": `88${req.body.mobileNumber}`,
        "sms": `Your otp is ${otp}`,
        "csms_id": randomnumber
    }
    console.log(obj);

    let axiospost = await axios.post(loginUrl, obj);


    res.status(201).json({
        status: 'success',
        infoCollection
    })}

})


exports.otpVerification = catchAsync(async (req, res, next) => {

    const {mobileNumber, otp} = req.body

    const otpmatch = await InfoCollectionModel.findOne({
        mobileNumber: mobileNumber,
        otp: otp
    });

    if(otpmatch === null) {
        res.status(200).json({
            message: 'Otp not match'
        })
    }else{

         const updateresultModel = await ResultModel.findOneAndUpdate(
        { _id: otpmatch.surveyInfo},{
            infocollect: 1,
            infocollectID: otpmatch._id
    },{new: true});

    const updateinfo = await InfoCollectionModel.findOneAndUpdate(
        {
        mobileNumber: mobileNumber,
        otp: otp
    },{
        verify: true,
            infocollectID: otpmatch._id
    },{new: true});

    res.status(200).json({
        message: 'Otp Verification Successful'
    })
    }



})


exports.otpResend = catchAsync(async (req, res, next) => {
    let otp =  otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
    let randomnumber = otpGenerator.generate(21,{upperCaseAlphabets: false, specialChars: false});

    let loginUrl = 'https://smsplus.sslwireless.com/api/v3/send-sms';
    // let messageBody = "Your OTP-CODE is {value would be}"
    let apiKey = "qy0v9orp-xl7pnvex-v1dm0rgm-fvjadzg0-dttywaou";
    let sid = "MAACOTP"
    let obj =  {
        "api_token": apiKey,
        "sid": sid,
        "msisdn": `88${req.body.mobileNumber}`,
        "sms": `Your otp is ${otp}`,
        "csms_id": randomnumber
    }
    console.log(obj);
    const {mobileNumber} = req.body

    const otpmatch = await InfoCollectionModel.findOne({
        mobileNumber: mobileNumber,
    });

    if(otpmatch.resendCount > 3){
        res.status(200).json({
            message: 'Otp send limit exceeded for this mobile'
        });
    }else if(otpmatch === null){
        res.status(200).json({
            message: 'Otp not match'
        })
    }
     else{
        
    
        let axiospost = await axios.post(loginUrl, obj);
    
    

         const surveyotp = await InfoCollectionModel.findOneAndUpdate({
            mobileNumber: mobileNumber
        },{
            $inc: {resendCount: 1},
            otp: otp
        },
        {
            new: true
        })

    res.status(200).json({
        message: 'Otp Resend Successfully'
    })
    }



})


exports.smsapi = catchAsync(async (req, res, next) => {

    // https://smsplus.sslwireless.com/api/v3/send-sms
    // axios.post('https://smsplus.sslwireless.com/api/v3/send-sms', {

    // })


    // axios.post(url[, data[, config]])

    // function testing(  ) {
    //     $loginUrl    = url( 'login' );
    //     $messageBody = "Dear Baker Hossain,\nYour Somriddhi Login Credential -\nUsername: 01840314188\nPassword: 123456\n\n{$loginUrl}\n\nSomriddhi team";
    //     $this->singleSms( '01840314188', $messageBody, rand() );
    // }
   
    //  console.log(axiospost)
     res.status(201).json({
        status: 'success',
        otp,
        randomnumber
    })
})


exports.surveyDatewise = catchAsync(async (req, res, next) => {
    
    const {dateId} = req.params;

    const totalSurvey = await ResultModel.find({
        user: req.user._id,
        date: dateId,
        infocollect: 1
    }).populate('infocollectID').select('infocollectID');

    res.status(200).json({
        status: 'success',
        length: totalSurvey.length,
        totalSurvey
    })

})


exports.singleSurvey = catchAsync(async (req, res, next) => {
    
    const {surveyId} = req.params;

    const Survey = await ResultModel.findOne({
        _id: surveyId
    }).populate('infocollectID');

    res.status(200).json({
        status: 'success',
        Survey
    })

})


exports.dummyimage = catchAsync(async (req, res, next) => {
    console.log(req.file)
    let image = await dummyImage.create({
        name: req.body.name,
        url: req.file.key
    })

    res.status(200).json({
        status: 'success',
        image
    })

})