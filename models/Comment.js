const mongoose = require('mongoose');
const MediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['image', 'video'],
  },
  name: {
    type: String,
  },
  url: {
    type: String,
  }
});

const CommentSchema = new mongoose.Schema({
  rateProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RateProduct',
  },
  rateBill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RateBill',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  media: [MediaSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = {Comment};
