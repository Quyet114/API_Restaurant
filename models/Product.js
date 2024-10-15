const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
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
  comment:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  rate: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rate'
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

module.exports = Product;