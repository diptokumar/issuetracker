const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const targetSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  
  actualTarget: {
      type: Number,
      required: [true, 'Please tell us Target ammount!']
    },
  achiveTarget: {
    type: Number,
    default:0.0
  },
  month:{
    type:String
  }
},
{
  timestamps: true
});

const Target = mongoose.model('Target', targetSchema);

module.exports = Target;