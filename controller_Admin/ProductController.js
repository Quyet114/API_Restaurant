
const  {Product} = require('../models/Product');

const currentDate = new Date();
const timeZoneOffset = 7 * 60 * 60 * 1000;
// First day of the month (timezone +7)
const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const firstDayInTimezone = new Date(firstDayOfMonth.getTime() - timeZoneOffset);

// Last day of the month (timezone +7)
const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
const lastDayInTimezone = new Date(lastDayOfMonth.getTime() - timeZoneOffset);
const ProductController = {
  // CRUD
  async createProduct(req, res) {
    try {
      const { name, priceFrom, priceTo, description, category } = req.body;

      const newProduct = new Product({
        name,
        priceFrom,
        priceTo,
        description,
        category
      });
      if (!newProduct) return res.status(400).json({ message: "Create product failed", status: -1 });
      await newProduct.save();
      res.status(201).json({ message: "Create product successfully", status: 1, product: newProduct });

    } catch (error) {

      res.status(500).json({ message: error, status: -1 });
    }
  },
  async updateProduct(req, res) {
    try {
      const productId = req.params;
      const updatedData = {};
      if (req.body.name) updatedData.name = req.body.name;
      if (req.body.priceFrom) updatedData.priceFrom = req.body.priceFrom;
      if (req.body.priceTo) updatedData.priceTo = req.body.priceTo;
      if (req.body.description) updatedData.description = req.body.description;
      if (req.body.category) updatedData.category = req.body.category;

      const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
        new: true,
        runValidators: true
      });

      if (!updatedProduct) return res.status(404).json({ message: "Product not found", status: -1 });
      res.status(200).json({ message: "Update product successfully", status: 1, product: updatedProduct });

    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  async deleteProduct(req, res) {
    try {
      const productId = req.params;
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) return res.status(404).json({ message: "Product not found", status: -1 });
      res.status(200).json({ message: "Delete product successfully", status: 1});
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },

  // Product 
  // Lấy danh sách sản phẩm có rating thấp hơn 3
  async getProductLowRating(req, res) {
    try {
      const products = await Product.find()
        .populate({
          path: 'rateProduct',
          match: { rating: { $lt: 3 } }, // Lọc các sản phẩm có rating thấp hơn 3
          populate: [
            {
              path: 'user',
              select: ['name', 'email', 'avatar'], // Lấy thông tin user
            },
            {
              path: 'comment',
            }
          ]
        });
  
      // Lọc sản phẩm chỉ có các đánh giá thấp hơn 3
      const filteredProducts = products.filter(product => product.rateProduct && product.rateProduct.length > 0);
  
      res.status(200).json({ message: "Get products with low ratings", status: 1, products: filteredProducts });
    } catch (error) {
      res.status(500).json({ message: error.message, status: -1 });
    }
  },
  // Lấy danh sách sản phẩm có rating cao hơn 4
  async getProductHighRating(req, res) {
    try {
      const products = await Product.find()
        .populate({
          path: 'rateProduct',
          match: { rating: { $gte: 4 } }, // Lọc các sản phẩm có rating cao hơn 4
          populate: [
            {path: 'user', select: ['name', 'email', 'avatar']},
            {path: 'comment'}
          ]});
          res.status(200).json({ message: "Get products with high ratings", status: 1, products });
    } catch (error) {
      res.status(500).json({ message: error.message, status: -1 });
    }
  },
  // Lấy danh sách sản phẩm có số lượng bán ra nhiều nhất 
  // kèm theo thông tin chi tiết của billDetail
  // tổng tiền của billDetail theo tháng  hiện tại
  async getProductByBillDetailPerMonth(req, res) {
    try {
      const products = await Product.aggregate([
        // Lọc các sản phẩm có billDetail trong tháng
        {
          $match: {
            billDetails: {
              $elemMatch: {
                createdAt: {
                  $gte: firstDayInTimezone,
                  $lt: lastDayInTimezone
                },
                status:'done'
              }
            }
          }
        },
        // Lấy thông tin chi tiết của billDetail
        {
          $lookup: {
            from: 'billdetails',
            localField: 'billDetails',
            foreignField: '_id',
            as: 'billDetails'
          }
        },
        // Tính tổng tiền của billDetail
        {
          $addFields: {
            totalBillDetail: { $map:{
              input: '$billDetails',
              as: 'billDetail',
              in: '$$billDetail.total'
            }}
            }
        },
        {
          $sort: { 'billDetails.length': -1 }
        }
      ]);

      res.status(200).json({ message: "Get products by bill detail per month", status: 1, products });

    } catch (error) {
      res.status(500).json({ message: error.message, status: -1 });
    }
  
  },
  
}

module.exports = ProductController;