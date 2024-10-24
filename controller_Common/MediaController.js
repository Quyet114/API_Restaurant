
const {ProductMedia} = require('../models/ProductMedia');
const {Comment} = require('../models/Comment');
const {Product} = require('../models/Product');
const MediaController = {

  async uploadMedia(req, res) {
    try {
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No file uploaded", status: -1 });
      }

      const media = files.map(file => {
        return {
          mediaType: file.mimetype.split('/')[0],
          url: file.path
        }
      });
      res.status(201).json({ message: "Upload media successfully", status: 1, media });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });

    }
  },
  async createCommentMedia(req, res) {
    try {
      const { commentId, url } = req.body;

      if (!commentId || !url || !Array.isArray(url)) {
        return res.status(400).json({ message: "Missing or invalid required fields", status: -1 });
      }

      for (const media of url) {
        if (!media.type || !media.name || !media.url || !['image', 'video'].includes(media.type)) {
          return res.status(400).json({ message: "Invalid media format", status: -1 });
        }
      }

      const newCommentMedia = new ProductMedia({
        commentId,
        url
      });
      await newCommentMedia.save();

      const newMediaOfComment = await Comment.findByIdAndUpdate(commentId, { $push: { media: newCommentMedia._id } }, {
        new: true,
        runValidators: true
      });

      if (!newMediaOfComment) return res.status(400).json({ message: "Create product media failed", status: -1 });
      
      res.status(201).json({ message: "Create product media successfully", status: 1, productMedia: newCommentMedia });


    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },

}

module.exports = MediaController; 