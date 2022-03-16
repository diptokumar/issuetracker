const catchAsync = require('../../utils/catchAsync')
const TeritoriModel = require('../../models/GeoModel/teritoriesModel')

exports.createterritory = catchAsync(async (req, res, next) => {
    const territory = await TeritoriModel.create(req.body);
    res.status(200).json({
        status: 'success',
        territory
    })
})

exports.getallterritory = catchAsync(async (req, res, next) => {
    const territory = await TeritoriModel.find()
    res.status(200).json({
        status: 'success',
        territory
    })
})

exports.getallareaterritory = catchAsync(async (req, res, next) => {
    const territory = await TeritoriModel.find({
        area: req.query.areaid,
    }).populate("area");
    res.status(200).json({
        status: 'success',
        length: territory.length,
        territory
    })
})

exports.getterritoryunderarea = catchAsync(async (req, res, next) => {
    const territory = await TeritoriModel.find({
        area: req.params.areaid,
    }).populate("area");
    res.status(200).json({
        status: 'success',
        length: territory.length,
        territory
    })
})

exports.getuserareaterritory = catchAsync(async (req, res, next) => {
    const territory = await TeritoriModel.find({
        area: req.user.area,
    }).populate("area");
    res.status(200).json({
        status: 'success',
        length: territory.length,
        territory
    })
})


exports.getallorgterritory = catchAsync(async (req, res, next) => {
    const {orgid} = req.params;

    const territory = await TeritoriModel.find({
        org: orgid,
    })
    res.status(200).json({
        status: 'success',
        length: territory.length,
        territory
    })
})

exports.getsingleterritory = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const singleterritory = await TeritoriModel.findOne({ _id: id })
    if (!singleterritory) {
        res.status(200).json({
            status: 'success',
            message: 'territory not found'
        })
    }
    res.status(200).json({
        status: 'success',
        singleterritory
    })
})

exports.updateterritory = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const updatesingleterritory = await TeritoriModel.updateOne({ _id: id }, req.body, { new: true })
    if (!updatesingleterritory) {
        res.status(200).json({
            status: 'success',
            message: 'territory not found'
        })
    }
    res.status(200).json({
        status: 'success',
        updatesingleterritory
    })
})

exports.deleteterritory = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const deletesingleterritory = await TeritoriModel.deleteOne({ _id: id })
    if (!deletesingleterritory) {
        res.status(200).json({
            status: 'success',
            message: 'territory not found'
        })
    }
    res.status(200).json({
        status: 'success',
        message: 'territory Deleted'
    })
})