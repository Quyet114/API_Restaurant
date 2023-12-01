const { Dishes } = require("../models/Dishes");
const dishesController = {
    //add New món ăn
    createNewDish: async (req, res, next) => {
        try {
            const newDish = await new Dishes({
                name: req.body.name,
                picture: req.body.path,
                about: req.body.about,
                start: req.body.start,
                price: req.body.price,

            });
            const dish = await newDish.save();
            res.status(200).json(dish);
            //res.status(200).json('ok');
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // get all món ăn
    getAllDishes: async (req, res, next) => {
        try {
            const dishes = await Dishes.find();
            res.status(200).json(dishes);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // delete món ăn
    deleteDish: async (req, res, next) => {
        try {
            const dish = await Dishes.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Successfully")

        } catch (error) {
            res.status(500).json(error);
        }
    },
    // lấy thông tin một món ăn
    getDishId: async (req, res, next) => {
        try {
            const id = req.params.id;
            const dish = await Dishes.findById(id);
            if (!dish) {
                return res.status(404).json({ message: 'Không tìm thấy món ăn' });
            }
            res.status(200).json(dish);
            return dish;
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },
    // cập nhật tt món ăn
    updateDish: async (req, res) => {
        try {
            const dish = await Dishes.findByIdAndUpdate(
                req.params.id.trim(),
                {
                    $set: req.body,
                },
                { returnDocument: "after" }
            )
            res.status(200).json(dish);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },
    //tìm kiếm món ăn
    findOneDish: async (req,res,next) => {
        const {keyword} = req.query;
        try {
            const dishes = await Dishes.find(
                { about: new RegExp(keyword, 'i') }
            );
            if (!dishes || dishes.length === 0) {

                return res.status(404).json({ message: 'Không tìm thấy tìm kiếm phù hợp.' });
            }
            console.log(keyword);
            return res.status(200).json(dishes);;

        } catch (error) {
            res.status(500).json(error);
            console.log("lỗi ở đây: ", error);
            console.log("key errs", keyword);
        }
    }
}
module.exports = dishesController;