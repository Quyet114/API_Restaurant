const {VipPerson} = require('../models/VipPerson');

const VipPersonController = {

  async getVipPersons(req, res) {
    try {
      const vipPersons = await VipPerson.find().populate('user');
      res.status(200).json({ status: 1, message:'get vipPersons successfully',vipPersons });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },
  async addVipPerson(req, res) {
    try {
      const { user, amountPaid, vipStart } = req.body;
      const newVipPerson = new VipPerson({ user, amountPaid, vipStart });
      await newVipPerson.save();
      res.status(200).json({ status: 1, message: 'VipPerson added successfully' });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  },
  async updateVipPerson(req, res) {
    try {
      const { id } = req.params;
      const { user, amountPaid, vipStart } = req.body;
      const updatedVipPerson = await VipPerson.findByIdAndUpdate(id, { user, amountPaid, vipStart });
      if (!updatedVipPerson) {
        return res.status(404).json({ status: -1, message: 'VipPerson not found' });
      }
      res.status(200).json({ status: 1, message: 'VipPerson updated successfully' });
    }catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  }
};

module.exports = VipPersonController;