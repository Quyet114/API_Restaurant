const { User } = require('../models/User')
const bcript = require("bcrypt")
const jwt = require('jsonwebtoken')
const { getIo } = require('../socket')

const userController = {
  async updateUserRole(req, res) {
    try {
      const { userId, role } = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, { role }, {
        new: true,
        runValidators: true
      })
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found', status: -1 });
      }
      res.status(200).json({ message: 'User updated successfully', status: 1, user: updatedUser });
    } catch (error) {

    }
  }
}
module.exports = userController