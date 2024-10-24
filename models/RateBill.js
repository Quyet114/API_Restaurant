const mongoose = require('mongoose');
const Product = require('./Product');

const Schema = mongoose.Schema;

const rateBillSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bill: {
    type: Schema.Types.ObjectId,
    ref: 'Bill',
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

const RateBill = mongoose.model('RateBill', rateBillSchema);
module.exports = {RateBill};