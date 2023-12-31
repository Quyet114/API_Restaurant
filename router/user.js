const middlewareController = require("../controller/middleware/middlewareController");
const userController = require("../controller/userController");

const route = require("express").Router();

//Get all users
route.get("/",middlewareController.verifyToken,userController.getAllUser);
//Get users
route.get("/:id",middlewareController.verifyTokenAndAdmin,userController.getUserId);
route.get("/one/:id",userController.getUserId);
//Delete user
route.delete("/:id", userController.deleteUser);
//updateUser
route.put("/:id",userController.updateUser);
module.exports = route;