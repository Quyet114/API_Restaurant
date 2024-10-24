const {Promotion} = require('../models/Promotion');
const {Product} = require('../models/Product');
const PromotionController = {
  async createPromotion(req, res) {
    try {
      const { productId, discount, discountType, startDate, endDate, description } = req.body;
      const newPromotion = new Promotion({ productId, discount, discountType, startDate, endDate, description  });
      await newPromotion.save();
      await Product.findByIdAndUpdate(productId, { promotion: newPromotion._id });
      res.status(200).json({ status: 1, message: 'Promotion created successfully' });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },
  async updatePromotion(req, res) {
    try {
      const { id } = req.params;
      
      // Lọc các trường không có giá trị trong req.body
      const updateFields = {};
      const { discount, discountType, startDate, endDate, description } = req.body;
      
      if (discount !== undefined) updateFields.discount = discount;
      if (discountType !== undefined) updateFields.discountType = discountType;
      if (startDate !== undefined) updateFields.startDate = startDate;
      if (endDate !== undefined) updateFields.endDate = endDate;
      if (description !== undefined) updateFields.description = description;
  
      // Sử dụng { new: true } để trả về bản ghi sau khi đã update
      const updatedPromotion = await Promotion.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
      
      if (!updatedPromotion) {
        return res.status(404).json({ status: -1, message: 'Promotion not found' });
      }
  
      res.status(200).json({ status: 1, message: 'Promotion updated successfully', data: updatedPromotion });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },
  async deletePromotion(req, res) {
    try {
      const { id } = req.params;
      const promotion = await Promotion.findByIdAndDelete(id);
      if (!promotion) {
        return res.status(404).json({ status: -1, message: 'Promotion not found' });
      }
      await Product.findByIdAndUpdate(promotion.productId, { promotion: null });
      res.status(200).json({ status: 1, message: 'Promotion deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  }
};

module.exports = PromotionController;