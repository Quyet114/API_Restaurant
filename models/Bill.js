
const mongoose = require('mongoose');
const {Voucher} = require('./Voucher');
const { verify } = require('jsonwebtoken');

const Schema = mongoose.Schema;

const BillSchema = new Schema({
  customer: {
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
  billDetail: [{
    type: Schema.Types.ObjectId,
    ref: 'BillDetail',
    required: true
  }],
  paymentMethod: {
    type: String,
    enum: ['Money', 'Credit Card'],
    default: 'Money'
  },
  voucher: {
    type: Schema.Types.ObjectId,
    ref: 'Voucher'
  },
  type:{
    type: String,
    enum:['pending','completed'],
    default:'pending'
  },
  mediaVerify:{
    type: String,
  },
  tip:{
    type: Number,
    default: 0
  },
  rate:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RateBill'
  }
  
});

const Bill = mongoose.model('Bill', BillSchema);

module.exports = {Bill};