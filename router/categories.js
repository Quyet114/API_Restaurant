const middlewareController = require("../controller/middlewareController");
const CategoryController = require('../controller/categoriesController');

const route = require("express").Router();
//create new category
route.post("/addnew", CategoryController.createNewCategories);
//Get all categories
route.get("/",CategoryController.getAllCategory);
//Get category
route.get("/:id",CategoryController.getCategoryId);
//Delete category
route.delete("/:id", CategoryController.deleteCategory);
//update category
route.put("/:id",CategoryController.updateCategory);
module.exports = route;