const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const geoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us Geo Name!']
      },
    area:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Area',
      default: null
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
    },
    teritori:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teritori',
      default: null
    },
    routes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Route',
        },
      ],
    geocode: {
      type: String,
      unique: true,
      required: true
    },
    totalsell: {
    type: Number,
    default: 0
  }

},
{
  timestamps: true
});

const Geo = mongoose.model('Geo', geoSchema);

module.exports = Geo;