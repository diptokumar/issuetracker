const catchAsync = require('../../utils/catchAsync')
const DistrictModel = require('../../models/GeoModel/districtModel')

exports.createDistrict = catchAsync(async (req, res, next) => {
    const district = await DistrictModel.create(req.body);
    res.status(200).json({
        status: 'success',
        district
    })
})

exports.getAllDistrict = catchAsync(async (req, res, next) => {
    const { limit, pageNo } = req.params;
    let value = (parseInt(pageNo) - 1) * parseInt(limit);
    let startIndex = value > 0 ? value : 0;
    let totalLength = await DistrictModel.countDocuments();

    const districts = await DistrictModel.find().populate({ path: "division", model: "Division", select: "name" }).skip(startIndex).limit(parseInt(limit));
    res.status(200).json({
        status: 'success',
        districts: districts,
        totalLength: totalLength,
        currentLength: districts.length
    })
})

exports.getDistrictByDivision = catchAsync(async (req, res, next) => {
    const { limit, pageNo, divisionId } = req.params;
    let value = (parseInt(pageNo) - 1) * parseInt(limit);
    let startIndex = value > 0 ? value : 0;
    let totalLength = await DistrictModel.countDocuments({ division: divisionId });

    const districts = await DistrictModel.find({
        division: divisionId
    }).populate({ path: "division", model: "Division", select: "name" }).skip(startIndex).limit(parseInt(limit));

    res.status(200).json({
        status: 'success',
        currentLength: districts.length,
        totalLength: totalLength,
        districts
    })
})

exports.getDistrictById = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const district = await DistrictModel.findOne({ _id: id })
    if (!district) {
        res.status(200).json({
            status: 'success',
            message: 'District not found'
        })
    }
    res.status(200).json({
        status: 'success',
        district
    })
})

exports.updateDistrict = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const district = await DistrictModel.updateOne({ _id: id }, req.body, { new: true })
    if (!district) {
        res.status(200).json({
            status: 'success',
            message: 'District not found'
        })
    }
    res.status(200).json({
        status: 'success',
        district
    })
})

exports.deleteDistrict = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const deleteData = await DistrictModel.deleteOne({ _id: id })
    if (!deleteData) {
        res.status(200).json({
            status: 'success',
            message: 'District not found'
        })
    }
    res.status(200).json({
        status: 'success',
        message: 'District Deleted'
    })
})