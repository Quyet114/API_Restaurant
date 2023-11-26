const authController = require("../controller/authController");
const passwordController = require("../controller/passwordController");

const router = require("express").Router();

router.post("/register", authController.registerUser);
router.post("/login",authController.loginUser);
router.post("/logout",authController.logOut);
module.exports = router;