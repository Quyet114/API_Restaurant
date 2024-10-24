const {RateBill} = require('../models/RateBill');

const currentDate = new Date();
const timeZoneOffset = 7 * 60 * 60 * 1000;
// First day of the month (timezone +7)
const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const firstDayInTimezone = new Date(firstDayOfMonth.getTime() - timeZoneOffset);

// Last day of the month (timezone +7)
const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
const lastDayInTimezone = new Date(lastDayOfMonth.getTime() - timeZoneOffset);


const RateBillController = {
  // lấy danh sách đánh giá thấp các hóa đơn trong tháng
  async getLowRateBillPerMonth(req, res) {
    try {
      const totalRate = await RateBill.aggregate([
        {
          $match: {
            createdAt: {
              $gte: firstDayInTimezone,
              $lt: lastDayInTimezone
            },
            rating: 1
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $lookup: {
            from: 'bills',
            localField: 'billId',
            foreignField: '_id',
            as: 'bill'
          }
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'rateBillId',
            as: 'comments'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $unwind: '$bill'
        },
        {
          $project: {
            rating: 1,
            comment: 1,
            createdAt: 1,
            user: {
              _id: 1,
              name: 1,
              email: 1
            },
            bill: {
              _id: 1,
              total: 1
            },
            comments: {
              _id: 1,
              content: 1
            }
          }
        }

      ]);

      res.status(200).json({ message: "Get low rate bill per month", status: 1, totalRate });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  }

};

module.exports = RateBillController;