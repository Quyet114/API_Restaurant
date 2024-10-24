const mongoose = require('mongoose');
const Product = require('./Product');

const Schema = mongoose.Schema;

const rateProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const RateProduct = mongoose.model('RateProduct', rateProductSchema);
module.exports = {RateProduct};