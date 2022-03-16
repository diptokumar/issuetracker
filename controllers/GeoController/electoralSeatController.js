const catchAsync = require('../../utils/catchAsync')
const ElectoralSeatModel = require('../../models/GeoModel/electoralSetModel')

exports.createElectoralSet = catchAsync(async (req, res, next) => {
    const electoralSet = await ElectoralSeatModel.create(req.body);
    res.status(200).json({
        status: 'success',
        electoralSet
    })
})

exports.getAllElectoralSet = catchAsync(async (req, res, next) => {
    const electoralSets = await ElectoralSeatModel.find().populate([{ path: "district", model: "District", select: "name", populate: { path: "division", model: "Division", select: "name" } }]).skip(startIndex).limit(parseInt(limit));
    res.status(200).json({
        status: 'success',
        electoralSets
    })
})

exports.getElectoralSetByDistrict = catchAsync(async (req, res, next) => {
    const { limit, pageNo, districtId } = req.params;
    const electoralSets = await ElectoralSeatModel.find({
        district: districtId,
    }).populate([{ path: "district", model: "District", select: "name", populate: { path: "division", model: "Division", select: "name" } }]);
    res.status(200).json({
        status: 'success',
        length: electoralSets.length,
        electoralSets
    })
})

exports.getElectoralSetById = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const electoralSet = await ElectoralSeatModel.findOne({ _id: id }).populate([{ path: "district", model: "District", select: "name", populate: { path: "division", model: "Division", select: "name" } }])
    if (!electoralSet) {
        res.status(200).json({
            status: 'success',
            message: 'Electoral sets not found'
        })
    }
    res.status(200).json({
        status: 'success',
        electoralSet
    })
})

exports.updateElectoralSet = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const electoralSets = await ElectoralSeatModel.updateOne({ _id: id }, req.body, { new: true })
    if (!electoralSets) {
        res.status(200).json({
            status: 'success',
            message: 'Electoral sets not found'
        })
    }
    res.status(200).json({
        status: 'success',
        electoralSets
    })
})

exports.deleteElectoralSet = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const result = await ElectoralSeatModel.deleteOne({ _id: id })
    if (!result) {
        res.status(200).json({
            status: 'success',
            message: 'Electoral sets not found'
        })
    }
    res.status(200).json({
        status: 'success',
        message: 'Electoral sets Deleted'
    })
})