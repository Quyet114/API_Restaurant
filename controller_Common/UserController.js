const { User } = require('../models/User')
const bcript = require("bcrypt")
const jwt = require('jsonwebtoken')
const { getIo } = require('../socket')

const userController = {
  async createUser(req, res) {
    try {
      const { username, email, password, age } = req.body;
      const salt = await bcript.genSalt(10);
      const hasedPassword = await bcript.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hasedPassword,
        age,
      })

      await newUser.save();
      const io = getIo();
      io.emit('createUser', newUser);
      res.status(201).json({ message: "successfuly", status: 1, user: newUser })
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  async updateUser(req, res) {
    try {
      const userId = req.user._id;

      const updatedData = {};
      const salt = await bcript.genSalt(10);

      if (req.body.password) updatedData.password = await bcript.hash(req.body.password, salt);
      if (req.body.username) updatedData.username = req.body.username;
      if (req.body.age) updatedData.age = req.body.age;
      if (req.body.avatar) updatedData.avatar = req.body.avatar;


      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
        new: true,           // Trả về document đã cập nhật
        runValidators: true  // Chạy validation trên các giá trị mới
      })
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found', status: -1 });
      }

      res.status(200).json({ message: 'User updated successfully', status: 1, user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
}
module.exports = userController