const {BillDetail} = require('../models/BillDetail');
const {Product} = require('../models/Product');


const BillDetailController = {
  async createBillDetail(req, res) {
    try {
      const { billId, productId, quantity, price, total } = req.body;
      const product = await Product.findById(productId).populate('promotion');
      let discount = 0;
      // Ensure the product exists and has a promotion
    if (product && product.promotion) {
      discount = product.promotion.discount || 0;
    }
      const newBillDetail = new BillDetail({
        billId,
        productId,
        quantity,
        price,
        total,
        discount
      });
      await newBillDetail.save();
     // Update the product by adding the bill detail reference
    await Product.findByIdAndUpdate(productId, {
      $push: { billDetail: newBillDetail._id }
    });

      res.status(201).json({ message: "Create bill detail successfully", status: 1, billDetail: newBillDetail });

    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }

  },
  async deleteBillDetail(req, res) {
    try {
      const { id } = req.params;
      await BillDetail.findByIdAndDelete(id);
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  async updateBillDetail(req, res) {
    try {
      const { id } = req.params;
      const { billId, quantity, price, total,discount } = req.body;
      const updateBillDetail = await BillDetail.findByIdandUpdate(id, { billId, quantity, price, total,discount });
      res.status(200).json({ message: "Update bill detail successfully", status: 1, billDetail: updateBillDetail });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  }

}

module.exports = BillDetailController; 