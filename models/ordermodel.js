const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const orderSchema = new mongoose.Schema({
  org:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  shop:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    default: null
  },
  office: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Office',
    default: null
  },
  route:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    default: null
  },
  area:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Area',
    default: null
  },
  territory:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teritori',
    default: null
  },

  region:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
    default: null
  },
  geo:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Geo',
    default: null
  },
  sr:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  dp:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  due:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Due',
    default: null
  },
  orderTakenDate:{
    type:String
  },
  orderTakenMonth:{
    type:String
  },
  deliveryDate:{
    type:String
  },
  totalproducts: Number,
  ordertakentime: String,
  dues:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Due',
       default: null
    },
  ],
  orderProducts:[
      {
        productName:{
          type:String
        },
        product:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          default: null
        },
        brand:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Brand',
          default: null
        },
        brandName:{
          type:String
        },
        unitPrice:{
          type:String
        },
        qty:{
          type:String
        },
        total:{
          type:String
        },
        category:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
          default: null
        },
        categoryName: {
          type: String,
          default: null
        },
        offer:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Offer',
          default: null
        },
        retaileroffer:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'RetailerOffer',
          default: null
        }
      }
  ],
  subTotal:{
    type:String
  },
  vat:{
    type:String
  },
  totalDiscount:{
    type:String
  },
  grandTotal:{
    type:String
  },
  collectAmount:{
    type:String,
    default: "0.0"
  },
  
  uniqueBrand: Number,
  inventorycheck: {
    type:Number,
    default: 0
  },
  status:{
    type:String,
    enum:['Pending','Cancel','Delivered','Due'],
    default:'Pending'
  },
  ordercancel: {
    type:String,
    enum:['true', 'false'],
    default:'false'
  },
  editedOrder:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EditedOrder',
    default: null
  },
  oldgrandTotal: {
    type:String,
    default: 0
  }
},
{
  timestamps: true
}


);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;