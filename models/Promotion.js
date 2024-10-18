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
  discountType: { 
    type: String,
    default: null
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

const Promotion = mongoose.model('Promotion', PromotionSchema);
module.exports = Promotion;