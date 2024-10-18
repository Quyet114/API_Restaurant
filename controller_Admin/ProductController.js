import Product from '../models/Product';

const ProductController = {
  async createProduct(req, res) {
    try {
      const { name, priceFrom, priceTo, description, category } = req.body;

      const newProduct = new Product({
        name,
        priceFrom,
        priceTo,
        description,
        category
      });
      if (!newProduct) return res.status(400).json({ message: "Create product failed", status: -1 });
      await newProduct.save();
      res.status(201).json({ message: "Create product successfully", status: 1, product: newProduct });

    } catch (error) {

      res.status(500).json({ message: error, status: -1 });
    }
  },
  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updatedData = {};
      if (req.body.name) updatedData.name = req.body.name;
      if (req.body.priceFrom) updatedData.priceFrom = req.body.priceFrom;
      if (req.body.priceTo) updatedData.priceTo = req.body.priceTo;
      if (req.body.description) updatedData.description = req.body.description;
      if (req.body.category) updatedData.category = req.body.category;

      const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
        new: true,
        runValidators: true
      });

      if (!updatedProduct) return res.status(404).json({ message: "Product not found", status: -1 });
      res.status(200).json({ message: "Update product successfully", status: 1, product: updatedProduct });

    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) return res.status(404).json({ message: "Product not found", status: -1 });
      res.status(200).json({ message: "Delete product successfully", status: 1, product: deletedProduct });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
}

module.exports = ProductController;