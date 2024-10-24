const { Comment } = require('../models/Comment');
const { Iventory } = require('../models/Inventory');
const { RateBill } = require('../models/RateBill');
const { RateProduct } = require('../models/RateProduct');

const CommentController = {
  async createComment(req, res) {
    try {
      const { rateProduct = null, rateBill = null, content, media = '' } = req.body;

      if (!content) {
        return res.status(400).json({ message: "Missing required fields", status: -1 });
      }
      const comment = new Comment({
        content,
        media
      });
      await comment.save();
      if (rateProduct) {
        await RateProduct.findByIdAndUpdate(rateProduct, {
          $push: { comment: comment._id }
        });
      }
      if (rateBill) {
        await RateBill.findByIdAndUpdate(rateBill, {
          $push: { comment: comment._id }
        });
      }

      res.status(201).json({ message: "Create comment successfully", status: 1, comment });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  async deleteComment(req, res) {
    try {
      const { id } = req.params;
      await Comment.findByIdAndDelete(id);
      res.status(200).json({ message: "Delete comment successfully", status: 1 });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },


}

module.exports = CommentController;