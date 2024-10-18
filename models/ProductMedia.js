const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});
const ProductMediaSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  media: [mediaSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Media = mongoose.model('ProductMedia', ProductMediaSchema);
module.exports = Media;