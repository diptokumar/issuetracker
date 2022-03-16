const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const electoralSetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us Electoral Set Name!']
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

const ElectoralSet = mongoose.model('ElectoralSet', electoralSetSchema);

module.exports = ElectoralSet;