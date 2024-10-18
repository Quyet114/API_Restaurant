const Bill = require('../models/Bill');
const Voucher = require('../models/Voucher');
const BillController = {
  async deleteBill(req, res) {
    try {
      const { id } = req.params;
      await Bill.findByIdAndDelete(id);
      res.status(200).json({ message: "Delete bill successfully", status: 1 });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  async payBilwithMoney(req, res) {
    try {
      const {billId,totalAmount, voucher} = req.body;
      await Bill.findByIdAndUpdate(billId, {
        paymentMenthod:'Money',
        voucher,
        totalAmount,
        type: 'completed'
      });
      res.status(200).json({ message: "Pay bill successfully", status: 1 });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
      
    }
  },
  async payBillwithCreditCard(req, res) {
    try {
      const {billId,totalAmount, voucher, mediaVerify,tip = 0} = req.body;
      await Bill.findByIdAndUpdate(billId, {
        paymentMenthod:'Credit Card',
        voucher,
        totalAmount,
        type: 'completed',
        mediaVerify,
        tip
      });
      res.status(200).json({ message: "Pay bill successfully", status: 1 });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
      
    }
  },
}

module.exports = BillController;