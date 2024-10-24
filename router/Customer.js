const express = require('express');
const router = express.Router();

const CommentController = require('../controller_Customer/CommentController');
const ProductController = require('../controller_Customer/ProductController');
const RateBillController = require('../controller_Customer/RateBillController');
const RateProductController = require('../controller_Customer/RateProductController');

// Comment routes
router.post('/createComment', CommentController.createComment);
router.delete('/updateComment/:id', CommentController.deleteComment);


// Product routes
// empty


// RateBill routes
router.post('/createRateBill', RateBillController.createRateBill);
router.post('/updateRateBill/:id', RateBillController.updateRateBill);


// RateProduct routes
router.post('/createRateProduct', RateProductController.createRateProduct);
router.post('/updateRateProduct/:id', RateProductController.updateRateProduct);


module.exports = router;