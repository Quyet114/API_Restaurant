import Product from '../models/Product';


const ProductController = {
  async createProduct(req, res){
    try {
      const { name, price, description, category } = req.body;

      const newProduct = new Product({
        name,
        price,
        description,
        category
      });
      if(!newProduct) return res.status(400).json({ message: "Create product failed", status: -1 });
      await newProduct.save();
      res.status(201).json({ message: "Create product successfully", status: 1, product: newProduct });

    } catch (error) {
      

    }
  }
}

module.exports = ProductController;