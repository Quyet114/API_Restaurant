const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  priceFrom: {
    type: Number,
    required: true,
    min: 0
  },
  priceTo: {
    type: Number,
    required: true,
    min: 0
  },
  avatar:{
    type: String,
    required: true
  },
  media: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductMedia'
  }],
  description: {
    type: String,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  promotion:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotion'
  },
  stock: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Inventory'
  },
  sold:{
    type: Number,
    default: 0
  },
  rate: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RateProduct'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  billDetails: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BillDetail'
  }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = {Product};