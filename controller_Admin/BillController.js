const {Bill} = require('../models/Bill');
const {Voucher} = require('../models/Voucher');

// Get the current date with a +7 hours offset
const currentDate = new Date();
const timeZoneOffset = 7 * 60 * 60 * 1000; // +7 hours in milliseconds

// Start and end of the day in +7 timezone
const startOfDay7 = new Date(currentDate.setHours(0, 0, 0, 0) - timeZoneOffset);
const endOfDay7 = new Date(currentDate.setHours(23, 59, 59, 999) - timeZoneOffset);

// Start and end of the day in UTC timezone
const startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0));
const endOfDay = new Date(new Date().setUTCHours(23, 59, 59, 999));

// First day of the month (timezone +7)
const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const firstDayInTimezone = new Date(firstDayOfMonth.getTime() - timeZoneOffset);

// Last day of the month (timezone +7)
const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
const lastDayInTimezone = new Date(lastDayOfMonth.getTime() - timeZoneOffset);
const BillController = {

  // danh sách hóa đơn đã thanh toán trong ngày
  async totalBillPaidToday(req, res) {
    try {
      const totalBill = await Bill.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfDay,
              $lt: endOfDay
            },
            type: 'completed'
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalAmount' }
          }
        }
      ]);

      res.status(200).json({ message: "Total bill paid today", status: 1, totalBill });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  // danh sách hóa đơn đã thanh toán trong tháng
  async totalBillPaidMotnh(req, res) {
    try {
      const totalBill = await Bill.aggregate([
        {
          $match: {
            createdAt: {
              $gte: firstDayInTimezone,
              $lt: lastDayInTimezone
            },
            type: 'completed'
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalAmount' }
          }
        }
      ]);

      res.status(200).json({ message: "Total bill paid today", status: 1, totalBill });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  // danh sách hóa đơn đã thanh toán theo nhân viên
  async totalBillPaidByStaff(req, res) {
    try {
      const {staffId} = req.body;
      const totalBill = await Bill.aggregate([
        {
          $match: {
            createdAt: {
              $gte: firstDayInTimezone,
              $lt: lastDayInTimezone
            },
            createdBy: staffId,
            type: 'completed'
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalAmount' }
          }
        }
      ]);

      res.status(200).json({ message: "Total bill paid by staff", status: 1, totalBill });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
}

module.exports = BillController;