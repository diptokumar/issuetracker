const catchAsync = require('../../utils/catchAsync')
const IssueModel = require('../../models/IssueModel/issueModel')
const moment = require('moment')
exports.createIssue = catchAsync(async (req, res, next) => {
   
   const today = moment().format('DD-MM-YYYY')
   const month = moment().format('MM-YYYY')
    const issue = await IssueModel.create(
        {...req.body,
        userId: req.user._id,
        issueCreatedDate: today,
        issueCreateMonth: month
    });
    res.status(201).json({
        status: 'success',
        issue
    })
})


exports.getIssuesHistory = catchAsync(async (req, res, next) => {
    const issue = await IssueModel.aggregate([
        {
            $match: {
                userId: req.user._id,
            }
        },
        {
            $group: {
                _id: {
                    instituteId: '$institute'
                },
                sum: {$sum: 1}
            }
        },
        {
            $lookup: {
                from: 'institutes',
                localField: '_id.instituteId',
                foreignField: '_id',
                as: 'infoinstitute'
            }
        }
    ]);
    res.status(200).json({
        status: 'success',
        issue
    })
})


exports.getschollomonthlyissueHistory = catchAsync(async (req, res, next) => {
    const { limit, pageNo, month,institute } = req.query;
    let value = (parseInt(pageNo) - 1) * parseInt(limit);
    let startIndex = value > 0 ? value : 0;

    // let totalLength = await DistrictModel.countDocuments({
    //     issueCreateMonth: month
    // });

    const issues = await IssueModel.find({
        institute: institute,
        issueCreateMonth: month
    }).skip(startIndex).limit(parseInt(limit));;
    res.status(200).json({
        status: 'success',
        length: issues.length,
        issues,
        // totalLength
    })
})


exports.getsingleIssueDetails = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const issues = await IssueModel.findById(id);
    res.status(200).json({
        status: 'success',
        issues,
        // totalLength
    })
})

exports.updateIssueStatus = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const issues = await IssueModel.findByIdAndUpdate(id, { status: req.body.status },{new: true});
    res.status(200).json({
        status: 'success',
        issues,
        // totalLength
    })
})


// exports.getAllUpazila = catchAsync(async (req, res, next) => {
//     const upazilas = await UpazilaModel.find().populate([{ path: "district", model: "District", select: "name", populate: { path: "division", model: "Division", select: "name" } }]).skip(startIndex).limit(parseInt(limit));
//     res.status(200).json({
//         status: 'success',
//         upazilas
//     })
// })

// exports.getUpazilaByDistrict = catchAsync(async (req, res, next) => {
//     const { limit, pageNo, districtId } = req.params;
//     const upazilas = await UpazilaModel.find({
//         district: districtId,
//     }).populate([{ path: "district", model: "District", select: "name", populate: { path: "division", model: "Division", select: "name" } }]);
//     res.status(200).json({
//         status: 'success',
//         length: upazilas.length,
//         upazilas
//     })
// })

// exports.getUpazilaById = catchAsync(async (req, res, next) => {
//     const { id } = req.params
//     const upazila = await UpazilaModel.findOne({ _id: id }).populate([{ path: "district", model: "District", select: "name", populate: { path: "division", model: "Division", select: "name" } }])
//     if (!upazila) {
//         res.status(200).json({
//             status: 'success',
//             message: 'Upazila not found'
//         })
//     }
//     res.status(200).json({
//         status: 'success',
//         upazila
//     })
// })

// exports.updateUpazila = catchAsync(async (req, res, next) => {
//     const { id } = req.params
//     const upazila = await UpazilaModel.updateOne({ _id: id }, req.body, { new: true })
//     if (!upazila) {
//         res.status(200).json({
//             status: 'success',
//             message: 'Upazila not found'
//         })
//     }
//     res.status(200).json({
//         status: 'success',
//         upazila
//     })
// })

// exports.deleteUpazila = catchAsync(async (req, res, next) => {
//     const { id } = req.params
//     const result = await UpazilaModel.deleteOne({ _id: id })
//     if (!result) {
//         res.status(200).json({
//             status: 'success',
//             message: 'Upazila not found'
//         })
//     }
//     res.status(200).json({
//         status: 'success',
//         message: 'Upazila Deleted'
//     })
// })