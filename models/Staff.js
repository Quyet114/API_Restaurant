
const mongoose = require('mongoose');

const workTimeSchema = new mongoose.Schema({
  date:{
    type: Date,
    required: true
  },
  checkIn:{
    type: Date,
  },
  checkOut:{
    type: Date,
  },
  isOff:{
    type: Boolean,
    default: false
  },
  reason:{
    type: String
  }

});
const requestOffSchema = new mongoose.Schema({
  date:{
    type: Date,
    required: true
  },
  reason:{
    type: String,
    required: true
  },
  status:{
    type: String,
    enum: ['pending','approved','rejected'],
    default: 'pending'
  },
  approvedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
const staffSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  level:{
    type: String,
    enum: ['staff','manager','admin'],  
    required: true
  },
  salary:{
    type: Number,
    required: true
  },
  dateJoin:{
    type: Date,
    default: Date.now
  },
  guarantee:{
    type: Number,
    required: true
  },
  workTime:[workTimeSchema],
  requestOff:[requestOffSchema]

});

const Staff = mongoose.model('Staff', staffSchema);
module.exports = {Staff};