const {Category} = require('../models/Category');

const CategoryController = {
  async createCategory(req, res) {
    try {
      const { name, description } = req.body;
      const newCategory = new Category({ name, description });
      await newCategory.save();
      res.status(201).json({ message: "Create category successfully", status: 1, category: newCategory });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const updatedCategory = await Category.findByIdAndUpdate(id, { name, description });
      if (!updatedCategory) return res.status(404).json({ message: "Category not found", status: -1 });
      res.status(200).json({ message: "Update category successfully", status: 1, category: updatedCategory });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }
  },
  // xóa danh mục sản phẩm
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      await Category.findByIdAndDelete(id);
      res.status(200).json({ message: "Delete category successfully", status: 1 });
    } catch (error) {
      res.status(500).json({ message: error, status: -1 });
    }

  }

  
}

module.exports = CategoryController;