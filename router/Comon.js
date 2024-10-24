const express = require('express');
const router = express.Router();

const AuthController = require('../controller_Common/AuthController');
const BillController = require('../controller_Common/BillController');
const BillDetailController = require('../controller_Common/BillDetailController');
const MediaController = require('../controller_Common/MediaController');
const ProductController = require('../controller_Common/ProductController');
const UserController = require('../controller_Common/UserController');

// Auth routes
router.post('/login', AuthController.login);

// Bill routes
router.post('/createBill', BillController.createBill);


// BillDetail routes
router.post('/createBillDetail', BillDetailController.createBillDetail);
router.post('/updateBillDetail/:id', BillDetailController.updateBillDetail);
router.delete('/updateBillDetail/:id', BillDetailController.deleteBillDetail);

// Media routes
router.post('/createCommentMedia', MediaController.createCommentMedia);
router.post('/uploadMedia', MediaController.uploadMedia);

// Product routes
router.post('/findProductsByName', ProductController.findProductsByName);
router.get('/getFiftyNewestProducts', ProductController.getFiftyNewestProducts);
router.get('/getFiftySoldProducts', ProductController.getFiftySoldProducts);
router.get('/getProductDetail/:id', ProductController.getProductDetail);
router.get('/getProductsByCategory/:category', ProductController.getProductsByCategory);
router.post('/getProductsByPrice', ProductController.getProductsByPrice);
router.get('/getProductsByRating', ProductController.getProductPromotion);
router.post('/getProductsByCategoryAndName', ProductController.getProductsByCategoryAndName);
router.post('/getProductsByCategoryAndPrice', ProductController.getProductsByCategoryAndPrice);
router.post('/getProductsByCategoryAndRating', ProductController.getProductsByCategoryAndRating);
router.get('/getTenNewestProductsByCategory/:category', ProductController.getTenNewestProductsByCategory);
router.get('/getTenSoldProductsByCategory/:category', ProductController.getTenSoldProductsByCategory);


// User routes
router.post('/createUser', UserController.createUser);
router.post('/updateUser', UserController.updateUser);

module.exports = router;