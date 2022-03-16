const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const teritoriSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us Terrirori Name!']
      },
      org:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
      },
      area:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area',
        default: null
      }
},
{
  timestamps: true
});

const Teritori = mongoose.model('Teritori', teritoriSchema);

module.exports = Teritori;