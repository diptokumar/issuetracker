const catchAsync = require('../../utils/catchAsync')
const PjpModel = require('../../models/pjpModel/pjpModel')
const moment = require('moment')
exports.createPjp = catchAsync(async (req, res, next) => {
    const institute = await PjpModel.create(req.body);
    res.status(201).json({
        status: 'success',
        institute
    })
})


exports.getTodayPjp = catchAsync(async (req, res, next) => {
    const today = moment().format('DD-MM-YYYY');
    const pjp = await PjpModel.findOne({
        userId: req.user._id,
        date: today
    }).populate({ path: 'institute', select: 'nameEnglish address image'});

    res.status(200).json({
        status: 'success',
        pjp
    })
})