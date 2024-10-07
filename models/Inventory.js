const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  productName: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inventory', InventorySchema);