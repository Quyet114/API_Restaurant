const {RateBill} = require('../models/RateBill');
const {Bill} = require('../models/Bill');

const RateBillController = {
  async createRateBill(req, res) {
    try {
      const { user, bill, rating, } = req.body;
      const newRateBill = new RateBill({
        user,
        bill,
        rating,
      });
      await newRateBill.save();
      res.status(201).json({ message: "Create rate bill successfully", status: 1, rateBill: newRateBill });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  async updateRateBill(req, res) {
    try {
      const { id } = req.params;
      const { rating } = req.body;
      const updateRateBill = await RateBill.findByIdAndUpdate(id, { rating });
      res.status(200).json({ message: "Update rate bill successfully", status: 1, rateBill: updateRateBill });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  }

}

module.exports = RateBillController;

