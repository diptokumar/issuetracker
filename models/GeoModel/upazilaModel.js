const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const upazilaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us Upazila Name!']
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
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

const Upazila = mongoose.model('Upazila', upazilaSchema);

module.exports = Upazila;