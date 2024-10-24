const {BillDetail} = require('../models/BillDetail');

const BillDetailController = {
  
  // get bill detail 
  async getBillDetailPending(req, res) {

    try {
      const billDetail = await BillDetail.find({ status: 'pending' }).sort({ createdAt: 1 });
      res.status(200).json({ status: 1, message: 'Get bill detail pending successfully', data: billDetail });
    } catch (error) {
      res.status(500).json({ status: -1, message: error });
    }
  },
  async getBillDetailDoing(req, res) {

    try {
      const billDetail = await BillDetail.find({ status: 'doing' }).sort({ createdAt: 1 });
      res.status(200).json({ status: 1, message: 'Get bill detail doing successfully', data: billDetail });
    } catch (error) {
      res.status(500).json({ status: -1, message: error });
    }
  },
  async getBillDetailDone(req, res) {

    try {
      const billDetail = await BillDetail.find({ status: 'done' }).sort({ createdAt: 1 });
      res.status(200).json({ status: 1, message: 'Get bill detail done successfully', data: billDetail });
    }catch (error) {
      res.status(500).json({ status: -1, message: error });
    }
  },


 // change status bill detail

  async changeStatusBillDetailToPending(req, res) {
    try {
      const { id } = req.params;
      await BillDetail.findByIdAndUpdate(id, { status: 'pending' });
      res.status(200).json({ status: 1, message: 'Change status bill detail to pending successfully' });
    }catch (error) {
      res.status(500).json({ status: -1, message: error });
    }
  },
  async changeStatusBillDetailToDoing(req, res) {
    try {
      const { id } = req.params;
      await BillDetail.findByIdAndUpdate(id, { status: 'doing' });  
      res.status(200).json({ status: 1, message: 'Change status bill detail to doing successfully' });
    }catch (error) {
      res.status(500).json({ status: -1, message: error });
    }
  },
  async changeStatusBillDetailToDone(req, res) {
    try {
      const { id } = req.params;
      await BillDetail.findByIdAndUpdate(id, { status: 'done' });
      res.status(200).json({ status: 1, message: 'Change status bill detail to done successfully' });
    }catch (error) {
      res.status(500).json({ status: -1, message: error });
    }
  },


}

module.exports = BillDetailController;  