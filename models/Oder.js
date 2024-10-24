const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: Schema.types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Schema.types.ObjectId,
    ref: 'Product',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {Order};