const adminController = require('../controller_Admin/UserController')
const userController = require('../controller_Common/UserController')
const authenticateUser = require('../middleware/authenticateUser')
const router = require('express').Router();


// createUser
router.post('/createuser' , userController.createUser);

// updatedUser
router.put('/updateuser', authenticateUser, userController.updateUser)



