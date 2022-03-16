const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const infoCollectionSchema = new Schema(
    {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    infotakenDate: String,
    infotakenTime: String,
    fullName: String,
    instituteName: String,
    mobileNumber: String,
    dob: String,
    address: String,
    photo: String,

    surveyInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'survey',
    },
    time: String,
    otp: String,
    verify: {
        type: Boolean,
        default: false,
    },
    resendCount: {
        type: Number,
        default: 0
    }
    },
    {
    timestamps: true
    }
);

var infoCollection = mongoose.model('infoCollection', infoCollectionSchema);

module.exports = infoCollection;

