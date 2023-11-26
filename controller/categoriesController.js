const { Categories } = require("../models/Catefories");
const CategoryController = {
    //add New thư mục
    createNewCategories: async (req, res, next) => {
        try {
            // name: string;
            // about: string;
            // start: boolean;
            const newCategory = await new Categories({
                name: req.body.name,
                about: req.body.about,
                start: req.body.start,

            });
            const categories = await newCategory.save();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // get all categories
    getAllCategory: async (req, res, next) => {
        try {
            const Catefories = await Categories.find();
            res.status(200).json(Catefories);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // delete categories
    deleteCategory: async (req, res, next) => {
        try {
            const categories = await Categories.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Successfully")

        } catch (error) {
            res.status(500).json(error);
        }
    },
    // lấy thông tin một categories
    getCategoryId: async (req, res, next) => {
        try {
            const id = req.params.id;
            const category = await Categories.findById(id);
            if (!category) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            res.status(200).json(category);
            return category;
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },
    // cập nhật tt tài khoản
    updateCategory: async (req, res) => {
        try {
            const category = await Categories.findByIdAndUpdate(
                req.params.id.trim(),
                {
                    $set: req.body,
                },
                { returnDocument: "after" }
            )
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },
}
module.exports = CategoryController;