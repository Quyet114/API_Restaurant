const {Bill} = require('../models/Bill');
const {Voucher} = require('../models/Voucher');
const BillController = {
  async createBill(req, res) {
    try {
      const { customer, totalAmount, } = req.body;
      const createdBy = req.user._id;

      const newBill = new Bill({
        customer,
        totalAmount,
        createdBy
      });
      await newBill.save();
      res.status(201).json({ message: "Create bill successfully", status: 1, bill: newBill });

    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
}

module.exports = BillController;