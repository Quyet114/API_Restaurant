const {RateProduct} = require('../../models/RateProduct');
const {Product} = require('../models/Product');
const RateProductController = {
  async createRateProduct(req, res) {
    try {
      const { user, product, rating, } = req.body;
      const newRateProduct = new RateProduct({
        user,
        product,
        rating,       
      });
      await newRateProduct.save();
      res.status(201).json({ message: "Create rate product successfully", status: 1, rateProduct: newRateProduct });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  async updateRateProduct(req, res) {
    try {
      const { id } = req.params;
      const {  rating } = req.body;
      const updateRateProduct = await RateProduct.findByIdAndUpdate(id, {rating });
      res.status(200).json({ message: "Update rate product successfully", status: 1, rateProduct: updateRateProduct });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  }


}

module.exports = RateProductController; 