const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    org: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    area:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Area'
    },
    region:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Region'
    },
    teritori:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teritori'
    },
    address: String,
    lat: String,
    lon: String,
    role: {
      type: String,
    },
    linemanager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    dateid: String,
    month: String,
    photo: {
      type: String,
      default: 'N/A'
    },
    intime: {
      type: String,
      default: 'N/A'
    },
    // distanceinmeter: String,
    office: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Office',
      default: null
    },
    isLate: {
      type: Boolean,
      default: false
    },
    remarks: {
      type: String,
      default: 'N/A'
    },
    dayOff: {
      outTime: {
        type: String,
        default:null
      },
      remarks: {
        type: String,
        default:null
      },
      lat: {
        type: String,
        
      },
      lon: String,
      address: String
    }
  },
  {
    timestamps: true
  }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
