const {User} = require("../models/User");
const bcrypt = require("bcrypt");
const authController = require("./authController");
const userController = {
    // get all user
    getAllUser: async (req, res, next) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // delete user
    deleteUser: async (req, res, next) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Successfully")

        } catch (error) {
            res.status(500).json(error);
        }
    },
    // lấy thông tin một user
    getUserId: async (req, res, next) => {
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            res.status(200).json(user);
            return user;
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },
    // cập nhật tt tài khoản
    updateUser: async (req, res) => {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id.trim(),
                {
                    $set: req.body,
                },
                { returnDocument: "after" }
            ).select("+password");
            const returnedUser = {
                ...user._doc
            };
            res.status(200).json(returnedUser);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },
}
module.exports = userController;