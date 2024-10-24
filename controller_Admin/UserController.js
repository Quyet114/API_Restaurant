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
  },
  // Lấy danh sách user theo số lượng tiền đã thanh toán
  // Sắp xếp theo số lượng tiền giảm dần

  async getUserByPaied(req, res) {
    try {
      const users = await User.aggregate([
        // Lọc user có role là customer
        {
          $match: { roles: 'customer' }
        },
        // join với bảng bills
        {
          $lookup: {
            from: 'bills',
            localField: '_id',
            foreignField: 'customer',
            as: 'bills'
          }
        },
        // Unwind bills
        {
          $unwind: '$bills'
        },
        // Lọc ra những bill có status là completed
        {
          $match: { 'bills.status': 'completed' }
        },
        // Group theo user
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            email: { $first: '$email' },
            avatar: { $first: '$avatar' },
            phone: { $first: '$phone' },
            address: { $first: '$address' },
            totalPaid: { $sum: '$bills.totalAmount' }
          }
        },
        // Sắp xếp theo totalPaid giảm dần
        {
          $sort: { totalPaid: -1 }
        }

      ])

      res.status(200).json({ message: 'List user by paied', status: 1, users });

    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  }
}
module.exports = userController