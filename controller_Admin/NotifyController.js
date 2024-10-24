const {Notification} = require('../models/Notification');
const {User} = require('../models/User');
const {getIo} = require('../socket');


const NotifyController = {

  // gửi thông báo cho khách hàng
  async sendNotifyToCustomer(req, res) {
    try {
      const { title, message, type } = req.body;
      const users = await User.find({ role: 'customer' });
      const notify = new Notification({ title, message, type });
      await notify.save();
      users.forEach(async user => {
        user.Notification.push(notify._id);
        await user.save();
        const io = getIo();
        io.emit('sendNotifyToCustomer', { title, message, type, user: user._id });
      });
    } catch (error) {
      res.status(500).json({ message: error.message, status: -1 });
    }
  },
  // gửi thông báo cho nhân viên
  async sendNotifyToStaff(req, res) {
    try {
      const { title, message, type } = req.body;
      const users = await User.find({ role: 'staff' });
      const notify = new Notification({ title, message, type });
      await notify.save();
      users.forEach(async user => {
        user.Notification.push(notify._id);
        await user.save();
        const io = getIo();
        io.emit('sendNotifyToStaff', { title, message, type, user: user._id });
      });
    }catch (error) {
      res.status(500).json({ message: error.message, status: -1 });
    }
  },
  // gửi thông báo cho user
  async sendNotifyToUser(req, res) {
    try {
      const { title, message, type, user } = req.body;
      const notify = new Notification({ title, message, type });
      await notify.save();
      await User.findByIdAndUpdate(user, { $push: { Notification: notify._id } });
      const io = getIo();
      io.emit('sendNotifyToUser', { title, message, type, user: user._id });
    } catch (error) {
      res.status(500).json({ message: error.message, status: -1 });
    }
  },

};

module.exports = NotifyController;