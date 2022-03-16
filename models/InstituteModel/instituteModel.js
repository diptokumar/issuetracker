const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const instituteSchema = new mongoose.Schema({
  eiinNumber: {
    type: String,
    required: [true, 'Please enter EIIN number!']
  },
  sequentialNumber: {
    type: String,
    required: [true, 'Please enter sequential number!']
  },
  division: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Division'
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District'
  },
  upazila: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Upazila'
  },
  electoralSeat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ElectoralSeat'
  },
  address: String,
  nameEnglish: {
    type: String,
    required: [true, 'Please enter english name!']
  },
  nameBangali: {
    type: String,
    required: [true, 'Please enter bangali name!']
  },
  management: {
    type: String,
    enum: ['GOVERNMENT', 'NON-GOVERNMENT']
  },
  location: String,
  instituteType: {
    type: String,
    //enum: ['School', 'College', 'School & College']
  },
  level: {
    type: String,
    //enum: ['Secondary']
  },
  studentType: {
    type: String,
    //enum: ['BOYS', 'GIRLS', 'CO-EDUCATION JOINT']
  },
  totalStudent: Number,
  femaleStudent: Number,
  totalTeacher: Number,
  femaleTeacher: Number,
  sizeOfCategory: String,
  headOfInstitute: String,
  contactNumber: String,
  alternativeContactNumber: String,
  lat: String,
  long: String,
  status: {
    type: Boolean,
    default: true,
    select: false
  }
},
  {
    timestamps: true
  });

const Institute = mongoose.model('Institute', instituteSchema);

module.exports = Institute;