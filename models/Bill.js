const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Voucher = require('./Voucher');

const Schema = mongoose.Schema;

const BillSchema = new Schema({
  customerName: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productName: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  billDetail: {
    type: Schema.Types.ObjectId,
    ref: 'BillDetail',
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['Money', 'Credit Card'],
    default: 'Money'
  },
  voucher: {
    type: Schema.Types.ObjectId,
    ref: 'Voucher'
  }
  
});

module.exports = mongoose.model('Bill', BillSchema);