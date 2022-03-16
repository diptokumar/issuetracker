const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const areaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us Area Name!']
      },
    org:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
      },
    region:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Region',
        default: null
      }
},
{
  timestamps: true
});

const Area = mongoose.model('Area', areaSchema);

module.exports = Area;