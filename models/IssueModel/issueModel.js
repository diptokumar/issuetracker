const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const issueSchema = new mongoose.Schema({
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute'
  },
  userId: { // Support Officer
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  issueType: {
    type: String,
    enum: ['Technical', 'Non-Technical']
  },
  issueName: {
    type: String,
    required: [true, 'Please enter issue name']
  },
  forWhom: {
    type: String,
    enum: ['Teacher', 'Parent', 'Student', 'Admin']
  },
  whomName: {
    type: String,
    required: [true, 'Please enter name']
  },
  whomContactNumber: {
    type: String,
    required: [true, 'Please enter number']
  },
  reason: String, // If issue is other
  timeOrDay: {
    type: String,
    enum: ['Hour(s)', 'Day(s)']
  },
  howLongWillItTake: String,
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Solved']
  }
},
  {
    timestamps: true
  });

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;