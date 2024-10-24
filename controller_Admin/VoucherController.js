const {Voucher} = require('../models/Voucher');

const VoucherController = {

  async createVoucher(req, res) {     
    try {
      const { code, discount, expirationDate } = req.body;
      const newVoucher = new Voucher({ code, discount, expirationDate });
      await newVoucher.save();
      res.status(200).json({ status: 1, message: 'Voucher created successfully' });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },
  async activeVoucher(req, res) {
    try {
      const {id} = req.params;
      const { isActive } = req.body;
      if (!isActive) {
        const voucher = await Voucher.findByIdAndUpdate(id, { isActive: true });
      } else {
        const voucher = await Voucher.findByIdAndUpdate(id, { isActive: false });
      }
      await voucher.save();
      res.status(200).json({ status: 1, message: 'Voucher updated successfully' });
    } catch (error) {

      res.status(500).json({ status: -1, message: error.message });
    }
  }

};
module.exports = VoucherController;
