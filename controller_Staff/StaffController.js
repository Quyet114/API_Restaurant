const {Staff} = require('../models/Staff');

const StaffController = {
  async createRequestOff(req, res) {
    try {
      const {id} = req.params;
      const {reason, date} = req.body;

      const staff = await Staff.findByIdAndUpdate(id, {
        $push: {
          requestOff: {
            reason,
            date,
            status: 'pending'
          }
        }
      }, {
        new: true
      });
      await staff.save();
      res.status(200).json({ message: "Create request off successfully", status: 1, staff });
    } catch (error) {
      res.status(500).json({ message: error.message, status: -1 });
    }
  },
  async checkIn(req, res) {
    try {
      const {id} = req.params;
      const staff = await Staff.findByIdAndUpdate(id, {
        $push: {
          workTime: {
            date: new Date(),
            isCheckIn: true
          }
        }
      }, {
        new: true
      });
      await staff.save();
      res.status(200).json({ message: "Check in successfully", status: 1, staff });
    } catch (error) {
      res.status(500).json({ message: error.message, status: -1 });
    }
  },
  async checkOut(req, res) {
    try {
      const {id} = req.params;
      const staff = await Staff.findByIdAndUpdate(id, {
        $push: {
          workTime: {
            date: new Date(),
            isCheckOut: true
          }
        }
      }, {
        new: true
      });
      await staff.save();
      res.status(200).json({ message: "Check out successfully", status: 1, staff });
    } catch (error) {
      res.status(500).json({ message: error.message, status: -1 });
    }
  },

}

module.exports = StaffController;