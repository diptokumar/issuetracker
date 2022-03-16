const catchAsync = require('../../utils/catchAsync')
const DivisionModel = require('../../models/GeoModel/divisionModel')

exports.createDivision = catchAsync(async (req, res, next) => {
    const division = await DivisionModel.create(req.body);
    res.status(200).json({
        status: 'success',
        division
    })
})

exports.getAllDivision = catchAsync(async (req, res, next) => {
    const { limit, pageNo } = req.query;
    let value = (parseInt(pageNo) - 1) * parseInt(limit);
    let startIndex = value > 0 ? value : 0;

    let totalLength = await DivisionModel.countDocuments();
    const divisions = await DivisionModel.find({}).skip(startIndex).limit(parseInt(limit));

    res.status(200).json({
        status: 'success',
        divisions: divisions,
        totalLength: totalLength,
        currentLength: divisions.length
    })
})

exports.getDivisionById = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const division = await DivisionModel.findOne({ _id: id })
    if (!division) {
        res.status(200).json({
            status: 'success',
            message: 'Division not found'
        })
    }
    res.status(200).json({
        status: 'success',
        division
    })
})

exports.updateDivision = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const division = await DivisionModel.updateOne({ _id: id }, req.body, { new: true })
    if (!division) {
        res.status(200).json({
            status: 'success',
            message: 'Division not found'
        })
    }
    res.status(200).json({
        status: 'success',
        division
    })
})

exports.deleteDivision = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const deleteData = await DivisionModel.deleteOne({ _id: id })
    if (!deleteData) {
        res.status(200).json({
            status: 'success',
            message: 'Division not found'
        })
    }
    res.status(200).json({
        status: 'success',
        message: 'Division Deleted'
    })
})