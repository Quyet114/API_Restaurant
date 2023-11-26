
const { User } = require('../models/User');
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');

const passwordController = {

    sendMail: async (req, res, next) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'tquyet1998@gmail.com',
                pass: 'yydzudzdfoiztqdf'
                //ok
            }
        });
        const passwordNew = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000).toString();
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(passwordNew, salt);
            const user = await User.findOne({ username: req.body.username })
            if (user) {
                await transporter.sendMail({
                    from: '"My gmail" <tquyet1998@gmail.com>',
                    to: user.email,
                    subject: "Yêu cầu mật khẩu mới",
                    text: `xin chào: ${user.username}`,
                    html: `Mật khẩu mới của bạn là : ${passwordNew}`
                });
                // await User.updateOne({email: user.email},{ $set: { password: passwordNew } });
                await User.findOneAndUpdate({ email: user.email }, { $set: { password: hashedPassword } },
                    { returnDocument: "after" });
                res.status(200).json({ message: "Gửi mail thành công" });
            }
            else {
                res.status(500).json({ status: err, message: "không tìm thấy email" });
            }

        } catch (err) {
            res.status(500).json({ status: err, message: "Gửi mail thất bại" });
        }

    }

}

module.exports = passwordController;