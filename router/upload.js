const uploadController = require('../controller/uploadController')
const route = require("express").Router();
const uploadCloud = require('../controller/middleware/cloudinaryMiddleware')
//upload image to
route.post("/upload",uploadCloud.single('image'), uploadController.uploadImage);

module.exports = route;

//-----------------------------------
