const catchAsync = require('../../utils/catchAsync')
const InstituteModel = require('../../models/InstituteModel/instituteModel')

exports.createInstitute = catchAsync(async (req, res, next) => {
    const institute = await InstituteModel.create(req.body);
    res.status(200).json({
        status: 'success',
        institute
    })
})

exports.getsingleInistitureDetails = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const institute = await InstituteModel.findById(id);
    res.status(200).json({
        status: 'success',
        institute,
    })
})

exports.getAllUpazila = catchAsync(async (req, res, next) => {
    const upazilas = await UpazilaModel.find().populate([{ path: "district", model: "District", select: "name", populate: { path: "division", model: "Division", select: "name" } }]).skip(startIndex).limit(parseInt(limit));
    res.status(200).json({
        status: 'success',
        upazilas
    })
})

exports.getUpazilaByDistrict = catchAsync(async (req, res, next) => {
    const { limit, pageNo, districtId } = req.params;
    const upazilas = await UpazilaModel.find({
        district: districtId,
    }).populate([{ path: "district", model: "District", select: "name", populate: { path: "division", model: "Division", select: "name" } }]);
    res.status(200).json({
        status: 'success',
        length: upazilas.length,
        upazilas
    })
})

exports.getUpazilaById = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const upazila = await UpazilaModel.findOne({ _id: id }).populate([{ path: "district", model: "District", select: "name", populate: { path: "division", model: "Division", select: "name" } }])
    if (!upazila) {
        res.status(200).json({
            status: 'success',
            message: 'Upazila not found'
        })
    }
    res.status(200).json({
        status: 'success',
        upazila
    })
})

exports.updateUpazila = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const upazila = await UpazilaModel.updateOne({ _id: id }, req.body, { new: true })
    if (!upazila) {
        res.status(200).json({
            status: 'success',
            message: 'Upazila not found'
        })
    }
    res.status(200).json({
        status: 'success',
        upazila
    })
})

exports.deleteUpazila = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const result = await UpazilaModel.deleteOne({ _id: id })
    if (!result) {
        res.status(200).json({
            status: 'success',
            message: 'Upazila not found'
        })
    }
    res.status(200).json({
        status: 'success',
        message: 'Upazila Deleted'
    })
})