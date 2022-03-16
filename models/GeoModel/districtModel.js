const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us District Name!']
  },
  division: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Division',
    default: null
  },
  status: {
    type: Boolean,
    default: true,
    select: false
  }
},
  {
    timestamps: true
  });

const District = mongoose.model('District', districtSchema);

module.exports = District;