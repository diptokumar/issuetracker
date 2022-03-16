const catchAsync = require('../../utils/catchAsync')
const RegionModel = require('../../models/GeoModel/regionModel')

exports.createregion = catchAsync(async (req, res, next) => {
    const region = await RegionModel.create(req.body);
    res.status(200).json({
        status: 'success',
        region
    })
})

exports.getallregion = catchAsync(async (req, res, next) => {
    const region = await RegionModel.find()
    res.status(200).json({
        status: 'success',
        region
    })
})

exports.getallorgregion = catchAsync(async (req, res, next) => {
    
    const {orgid} = req.params;

    const region = await RegionModel.find({
        org: orgid,
    })
    res.status(200).json({
        status: 'success',
        length: region.length,
        region
    })
})
exports.getsingleregion = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const singleregion = await RegionModel.findOne({ _id: id })
    if (!singleregion) {
        res.status(200).json({
            status: 'success',
            message: 'region not found'
        })
    }
    res.status(200).json({
        status: 'success',
        singleregion
    })
})

exports.updateregion = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const updatesingleregion = await RegionModel.updateOne({ _id: id }, req.body, { new: true })
    if (!updatesingleregion) {
        res.status(200).json({
            status: 'success',
            message: 'region not found'
        })
    }
    res.status(200).json({
        status: 'success',
        updatesingleregion
    })
})

exports.deleteregion = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const deletesingleregion = await RegionModel.deleteOne({ _id: id })
    if (!deletesingleregion) {
        res.status(200).json({
            status: 'success',
            message: 'region not found'
        })
    }
    res.status(200).json({
        status: 'success',
        message: 'region Deleted'
    })
})