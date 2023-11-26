const middlewareController = require("../controller/middlewareController");
const dishesController = require('../controller/dishesContronller');

const route = require("express").Router();
//create new dish
route.post("/addnew", dishesController.createNewDish);
//Get all dishes
route.get("/",dishesController.getAllDishes);
//Get dishes
route.get("/:id",dishesController.getDishId);
//Delete user
route.delete("/:id", dishesController.deleteDish);
//updateUser
route.put("/:id",dishesController.updateDish);
module.exports = route;