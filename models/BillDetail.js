const mongoose = require('mongoose');
const Promotion = require('./Promotion');
const Schema = mongoose.Schema;

const BillDetailSchema = new Schema({
  billId: {
    type: Schema.Types.ObjectId,
    ref: 'Bill',
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  promotion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotion',
  },
  discount: {
    type: Number,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BillDetail', BillDetailSchema);