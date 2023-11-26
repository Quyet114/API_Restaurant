
const passwordController = require('../controller/passwordController');
const router = require("express").Router();
// reset password
router.post('/reset-password',passwordController.sendMail);

module.exports=router