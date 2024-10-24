const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const voucherSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discount: {
    type: Number,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = {Voucher};