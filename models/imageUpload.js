const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const dummyimageSchema = new mongoose.Schema({
  
    name: String,
    url:String
},
{
  timestamps: true
});

const dummyimages = mongoose.model('dummyimage', dummyimageSchema);

module.exports = dummyimages;