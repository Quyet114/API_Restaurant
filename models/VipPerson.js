const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VipPersonSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amountPaid: {
    type: Number,
    required: true
  },
  vipStars: {
    type: Number,
    required: true
  }
});

const VipPerson = mongoose.model('VipPerson', VipPersonSchema);
module.exports = {VipPerson};