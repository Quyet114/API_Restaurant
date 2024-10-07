const mongoose = require('mongoose')

const avatarLinks = [
  'https://example.com/avatar1.png',
  'https://example.com/avatar2.png',
  'https://example.com/avatar3.png'
];
const genetateRanDomAvatar = () => {
  const random = Math.floor(Math.random() * avatarLinks.length);
  return avatarLinks[random];
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true, // bắt buộc
    unique: true, // không được trùng
    trim: true // loại bỏ khoảng trắng
  },
  avatar: {
    type: String,
    default: genetateRanDomAvatar
  },
  email: {
    type: String,
    lowercase: true, // chữ hoa => thường
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    min: 1,
    max: 130
  },
  roles: {
    type: Boolean,
    default: 'user', // mặc định true
    emum: ['admin', 'user', 'customer', 'guest', 'staff'],
  },
  create: {
    type: Date,
    default: Date.now
  },
  bill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bill'
  }
});

const User = mongoose.model('User', userSchema)
module.exports = { User };