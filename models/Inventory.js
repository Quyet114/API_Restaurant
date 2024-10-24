const e = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  sizeText: [
    {
      _id: 'S',
      type: 'S',
      quantity: {
        type: Number,
        default: 0
      },
      price:{
        type: Number,
        default: 0
      }
    },
    {
      _id: 'M',
      type: 'M',
      quantity: {
        type: Number,
        default: 0
      },
      price:{
        type: Number,
        default: 0
      }
    },
    {
      _id: 'L',
      type: 'L',
      quantity: {
        type: Number,
        default: 0
      },
      price:{
        type: Number,
        default: 0
      }
    },
    {
      _id: 'XL',
      type: 'XL',
      quantity: {
        type: Number,
        default: 0
      },
      price:{
        type: Number,
        default: 0
      }
    }
  ],
  sizeNumber: [{
    _id: '36',
    type: '36',
    quantity: {
      type: Number,
      default: 0
    },
    price:{
      type: Number,
    }
  },
  {
    _id: '37',
    type: '37',
    quantity: {
      type: Number,
      default: 0
    },
    price:{
      type: Number,
    }
  },
  {
    _id: '38',
    type: '38',
    quantity: {
      type: Number,
      default: 0
    },
    price:{
      type: Number,
    }
  },
  {
    _id: '39',
    type: '39',
    quantity: {
      type: Number,
      default: 0
    },
    price:{
      type: Number,
    }
  },
  {
    _id: '40',
    type: '40',
    quantity: {
      type: Number,
      default: 0
    },
    price:{
      type: Number,
    }
  },
  {
    _id: '41',
    type: '41',
    quantity: {
      type: Number,
      default: 0
    },
    price:{
      type: Number,
    }
  },
  {
    _id: '42',
    type: '42',
    quantity: {
      type: Number,
      default: 0
    },
    price:{
      type: Number,
    }
  },
  {
    _id: '43',
    type: '43',
    quantity: {
      type: Number,
      default: 0
    },
    price:{
      type: Number,
    }
  },
  {
    _id: '44',
    type: '44',
    quantity: {
      type: Number,
      default: 0
    },
    price:{
      type: Number,
    }
  },
  {
    _id: '45',
    type: '45',
    quantity: {
      type: Number,
      default: 0
    },
    price:{
      type: Number,
    }
  }]
});

const Inventory= mongoose.model('Inventory', InventorySchema);
module.exports = {Inventory};