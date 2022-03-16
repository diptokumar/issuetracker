const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const routeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us Area Name!']
      },
    routeCode: {
      type: String,
      required: [true, 'Please tell us Route code!']
    },
    org:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    geo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Geo',
        default: null
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
      },
    ],  
    shops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
      },
    ],
    availableDay: [
      {
        type:String,
      },
    ],  
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;