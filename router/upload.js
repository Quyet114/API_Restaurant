const uploadController = require("../controller/uploadController");

const route = require("express").Router();
route.post("/v1/media/upload",uploadController.uploadImage);
module.exports = route;