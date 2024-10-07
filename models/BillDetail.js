const mongoose = require('mongoose');

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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BillDetail', BillDetailSchema);