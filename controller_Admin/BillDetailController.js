const {BillDetail} = require('../models/BillDetail');
const {Product} = require('../models/Product');

const currentDate = new Date();
const timeZoneOffset = 7 * 60 * 60 * 1000; // +7 hours in milliseconds
// First day of the month (timezone +7)
const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const firstDayInTimezone = new Date(firstDayOfMonth.getTime() - timeZoneOffset);

// Last day of the month (timezone +7)
const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
const lastDayInTimezone = new Date(lastDayOfMonth.getTime() - timeZoneOffset);
const BillDetailController = {

  // lấy danh sách BillDetail theo productId và thống kê số lượng theo tháng
  async countBillDetail(req, res) {
    try {
      const firstDayInTimezone = new Date(req.body.firstDay); // Nhận ngày đầu tháng từ request body
      const lastDayInTimezone = new Date(req.body.lastDay); // Nhận ngày cuối tháng từ request body

      const totalBillPerMonth = await BillDetail.aggregate([
        {
          $match: {
            createdAt: {
              $gte: firstDayInTimezone,
              $lt: lastDayInTimezone
            }
          }
        },
        {
          $group: {
            _id: "$productId", // Chia theo productId
            total: { $sum: 1 }, // Tổng số billDetail theo productId
            billDetails: { $push: "$$ROOT" } // Lấy danh sách tất cả các billDetail liên quan đến productId đó
          }
        }
      ]);
      const populatedBills = await BillDetail.populate(totalBillPerMonth, { path: "_id" });

      res.status(200).json({
        message: "Total bill detail per month grouped by productId",
        status: 1,
        totalBillPerMonth: populatedBills
      });

    } catch (error) {
      res.status(500).json({ message: error.message, status: -1 });
    }
  },


}

module.exports = BillDetailController; 