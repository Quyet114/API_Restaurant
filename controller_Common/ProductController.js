const {Product} = require('../models/Product');
const { find } = require('../models/Promotion');

const ProductController = {
  // category
  async getProductsByCategory(req, res) {
    try {

      const { category } = req.params;
      const products = await Product.find({ category });
      res.status(200).json({ message: "Get products successfully", status: 1, products });
    } catch (error) {

      res.status(500).json({ message: error, status: -1 });
    }
  },
  async getTenSoldProductsByCategory(req, res) {
    try {
      const { category } = req.params;
      const products = await Product.aggregate([
        { $match: { category } },
        { $sort: { sold: -1 } },
        { $limit: 10 }
      ])
      res.status(200).json({ message: "Get products successfully", status: 1, products });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  async getTenNewestProductsByCategory(req, res) {
    try {
      const { category } = req.params;
      const products = await Product.find({ category }).sort({ createdAt: -1 }).limit(10);
      res.status(200).json({ message: "Get products successfully", status: 1, products });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  async getProductsByCategoryAndPrice(req, res) {
    try {
      const { category, priceFrom, priceTo } = req.body;
      const products = await Product.find({ category, priceFrom: { $gte: priceFrom }, priceTo: { $lte: priceTo } });
      res.status(200).json({ message: "Get products successfully", status: 1, products });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  async getProductsByCategoryAndName(req, res) {
    try {
      const { category, name } = req.body;
      const products = await Product.find({ category, name: { $regex: name, $options: 'i' } });
      res.status(200).json({ message: "Get products successfully", status: 1, products });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  async getProductsByCategoryAndRating(req, res) {
    try {
      const { category, rating } = req.body;
      const products = await Product.find({ category, rating });
      res.status(200).json({ message: "Get products successfully", status: 1, products });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  // all
  async getFiftySoldProducts(req, res) {
    try {
      const products = await Product.aggregate([
        { $sort: { sold: -1 } },
        { $limit: 50 }
      ])
      res.status(200).json({ message: "Get products successfully", status: 1, products });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },

  async getFiftyNewestProducts(req, res) {
    try {
      const products = await Product.find().sort({ createdAt: -1 }).limit(50);
      res.status(200).json({ message: "Get products successfully", status: 1, products });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },

  async getProductsByPrice(req, res) {
    try {
      const { priceFrom, priceTo } = req.body;
      const products = await Product.find({ priceFrom: { $gte: priceFrom }, priceTo: { $lte: priceTo } });
      res.status(200).json({ message: "Get products successfully", status: 1, products });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },

  async findProductsByName(req, res) {
    try {
      const { name } = req.body;
      const products = await Product.find({ name: { $regex: name, $options: 'i' } });
      res.status(200).json({ message: "Get products successfully", status: 1, products });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },

  async getProductPromotion(req, res) {
    try {
      const products = await Product.find({ promotion: { $exists: true } });
      res.status(200).json({ message: "Get products successfully", status: 1, products });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  // get detail

  async getProductDetail(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id)
        .populate(['category',
          'promotion',
          'media',
          {
            path: 'rate',
            populate: [
              {
                path: 'comment',
                model: 'Comment',
              },
              {
                path: 'user',
                model: 'User',
              }]
          },
          'inventory']);
      if (!product) return res.status(404).json({ message: "Product not found", status: -1 });
      res.status(200).json({ message: "Get product successfully", status: 1, product });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  }
}


module.exports = ProductController; 