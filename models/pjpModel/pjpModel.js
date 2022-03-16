const mongoose = require('mongoose');

const pjpSchema = new mongoose.Schema({
  
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userName: {
    type: String,
  },
  date: {
    type: String,
  },

  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
  }
},
  {
    timestamps: true
  });

const pjpModel = mongoose.model('Pjp', pjpSchema);

module.exports = pjpModel;