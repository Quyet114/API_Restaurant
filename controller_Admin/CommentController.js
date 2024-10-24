const {Comment} = require('../models/Comment');
const {RateProduct} = require('../models/RateProduct');
const {RateBill} = require('../models/RateBill');


const CommentController = {
  async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const deletedComment = await Comment.findById(id);
      if (!deletedComment) {
        return res.status(404).json({ status: -1, message: 'Comment not found' });
      }
      if(deletedComment.rateProduct){
        await RateProduct.findByIdAndDelete(deletedComment.rateProduct, { comment: null });

      }
      if(deletedComment.rateBill){
        await RateBill.findByIdAndDelete(deletedComment.rateBill, { comment: null });
      }
      await Comment.findByIdAndDelete(id);

      res.status(200).json({ status: 1, message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }


  }


};

module.exports = CommentController;