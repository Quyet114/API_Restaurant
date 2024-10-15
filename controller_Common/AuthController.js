const { User } = require("../models/User");
const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.JWT_ACCESS_KEY;

const authController = {

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email', status: -1 });
      }
      if ((await bcript.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid password', status: -1 });
      }
      const accessToken = jwt.sign(
        { id: user._id },
        secretKey,
        { expiresIn: '7d' }

      )
      const { password: userPassword, ...userInfo } = user._doc;
      res.status(200).json({
        message: 'Login successful',
        status: 1,
        body: {
          ...userInfo,
          token: accessToken
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message, status: -1 });
    }
  }

}

module.exports = authController;