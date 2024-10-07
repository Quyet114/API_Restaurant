const userController = require('../controller/UserController')
const authenticateUser = require('../controller/middleWare/authenticateUser')
const router = require('express').Router();


// createUser
router.post('/link' , userController.createUser);

// updatedUser
router.put('/link', authenticateUser, userController.updateUser)



