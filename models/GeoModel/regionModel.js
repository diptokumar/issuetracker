const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const RegionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us Region Name!']
      },
      org:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
      },
    totalsell: {
    type: Number,
    default: 0
  }
},
{
  timestamps: true
});

const Region = mongoose.model('Region', RegionSchema);

module.exports = Region;