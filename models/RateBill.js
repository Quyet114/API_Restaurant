const mongoose = require('mongoose');
const Product = require('./Product');

const Schema = mongoose.Schema;

const rateBillSchema = new Schema({
  staff: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customer: {
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
    required: true
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

const RateBill = mongoose.model('RateBill', rateBillSchema);
module.exports = RateBill;