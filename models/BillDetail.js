const mongoose = require('mongoose');
const {Promotion} = require('./Promotion');
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
  discount: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['none', 'pending', 'doing', 'done'],
    default: 'none'
  },
}, {
  timestamps: true
});

const BillDetail = mongoose.model('BillDetail', BillDetailSchema);
module.exports = {BillDetail};