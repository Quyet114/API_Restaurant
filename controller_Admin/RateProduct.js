const {RateProduct} = require('../models/RateProduct');
const {Comment} = require('../models/Comment');


const currentDate = new Date();
const timeZoneOffset = 7 * 60 * 60 * 1000;
// First day of the month (timezone +7)
const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const firstDayInTimezone = new Date(firstDayOfMonth.getTime() - timeZoneOffset);

// Last day of the month (timezone +7)
const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
const lastDayInTimezone = new Date(lastDayOfMonth.getTime() - timeZoneOffset);
const RateProductController = {
  // lấy danh sách đánh giá thấp các sản phẩm trong tháng
  async getLowRateProductPerMonth(req, res) {
    try {
      const totalRate = await RateProduct.aggregate([
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
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'product'
          }
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'rateProductId',
            as: 'comments'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $unwind: '$product'
        },
        {
          $project: {
            rating: 1,
            createdAt: 1,
            'user.name': 1,
            'user.email': 1,
            'product.name': 1,
            'product.description': 1,
            comments: 1
          }
        }
      ]);

      res.status(200).json(totalRate);
    } catch (error) {
      res.status(500).json({ message: error.message, status: -1 });
    }
  },
  // xóa đánh giá một sản phẩm
  async deleteRateProduct(req, res) {
    try {
      const { id } = req.params;
      const deletedRateProduct = await RateProduct.findById(id);
      if (!deletedRateProduct) {
        return res.status(404).json({ status: -1, message: 'RateProduct not found' });
      }
      if(deletedRateProduct.comment){
        await Comment.findByIdAndDelete(deletedRateProduct.comment, { rateProduct: null });
      }
      await RateProduct.findByIdAndDelete(id);
      res.status(200).json({ status: 1, message: 'RateProduct deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },

};

module.exports = RateProductController;