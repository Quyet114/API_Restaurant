import ProductMedia from "../models/ProductMedia";
import Product from "../models/Product";

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
  async createProductMedia(req, res) {
    try {
      const { productId, url } = req.body;

      if (!productId || !url || !Array.isArray(url)) {
        return res.status(400).json({ message: "Missing or invalid required fields", status: -1 });
      }

      for (const media of url) {
        if (!media.type || !media.name || !media.url || !['image', 'video'].includes(media.type)) {
          return res.status(400).json({ message: "Invalid media format", status: -1 });
        }
      }

      const newProductMedia = new ProductMedia({
        productId,
        url
      });
      await newProductMedia.save();

      const newMediaOfProduct = await Product.findByIdAndUpdate(productId, { $push: { media: newProductMedia._id } }, {
        new: true,
        runValidators: true
      });

      if (!newMediaOfProduct) return res.status(400).json({ message: "Create product media failed", status: -1 });
      
      res.status(201).json({ message: "Create product media successfully", status: 1, productMedia: newProductMedia });


    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  async updateProductMedia(req, res) {
    try {
      const productMediaId = req.params.id;
      const updatedData = {};
      if (req.body.mediaType) updatedData.mediaType = req.body.mediaType;
      if (req.body.url) updatedData.url = req.body.url;

      const updatedProductMedia = await ProductMedia.findByIdAndUpdate(productMediaId, updatedData, {
        new: true,
        runValidators: true
      });

      if (!updatedProductMedia) return res.status(404).json({ message: "Product media not found", status: -1 });
      res.status(200).json({ message: "Update product media successfully", status: 1, productMedia: updatedProductMedia });

    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  }

}

module.exports = MediaController; 