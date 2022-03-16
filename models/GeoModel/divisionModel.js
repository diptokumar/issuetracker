const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const DivisionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us Division Name!']
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

const Division = mongoose.model('RegDivisionion', DivisionSchema);

module.exports = Division;