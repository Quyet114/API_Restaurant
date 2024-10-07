const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Promotion', PromotionSchema);