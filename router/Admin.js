const express = require('express');
const router = express.Router();

const BillController = require('../controller_Admin/BillController');
const BillDetailController = require('../controller_Admin/BillDetailController');
const CategoryController = require('../controller_Admin/CategoryController');
const CommentController = require('../controller_Admin/CommentController');
const InventoryController = require('../controller_Admin/InventoryController');
const MediaController = require('../controller_Admin/MediaController');
const NotifyController = require('../controller_Admin/NotifyController');
const ProductController = require('../controller_Admin/ProductController');
const PromotionController = require('../controller_Admin/PromotionController');
const RateBillController = require('../controller_Admin/RateBillController');
const RateProductController = require('../controller_Admin/RateProduct');
const StaffController = require('../controller_Admin/StaffController');
const UserController = require('../controller_Admin/UserController');
const VipPersonController = require('../controller_Admin/VipPersonController');
const VoucherController = require('../controller_Admin/VoucherController');





// Bill routes
router.post('/totalBillPaidByStaff', BillController.totalBillPaidByStaff);
router.get('/totalBillPaidMotnh', BillController.totalBillPaidMotnh);
router.get('/totalBillPaidToday', BillController.totalBillPaidToday);


// BillDetail routes
router.get('/getBillDetailByBillId', BillDetailController.countBillDetail);

// Category routes
router.post('/getCategory', CategoryController.createCategory);
router.post('/updateCategory', CategoryController.updateCategory);
router.delete('/deleteCategory/:id', CategoryController.deleteCategory);


// Comment routes
router.delete('/deleteComment/:id', CommentController.deleteComment);


// Inventory routes
router.post('/createInventory', InventoryController.createInventory);
router.post('/updateSizeQty', InventoryController.updateSizeQty);


// Media routes
router.post('/createProductMedia', MediaController.createProductMedia);
router.post('/updateProductMedia', MediaController.updateProductMedia);



// Notify routes

router.post('/sendNotifyToUser', NotifyController.sendNotifyToUser);
router.post('/sendNotifyToStaff', NotifyController.sendNotifyToStaff);
router.post('/sendNotifyToCustomer', NotifyController.sendNotifyToCustomer);


// Product routes
router.post('/createProduct', ProductController.createProduct);
router.post('/updateProduct/:productId', ProductController.updateProduct);
router.delete('/deleteProduct/:productId', ProductController.deleteProduct);
router.get('/getProductByBillDetailPerMonth', ProductController.getProductByBillDetailPerMonth);
router.get('/getProductHighRating', ProductController.getProductHighRating);
router.get('/getProductLowRating', ProductController.getProductLowRating);


// Promotion routes
router.post('/createPromotion', PromotionController.createPromotion);
router.post('/updatePromotion/:id', PromotionController.updatePromotion);
router.delete('/deletePromotion/:id', PromotionController.deletePromotion);


// RateBill routes
router.get('/getLowRateBillPerMonth', RateBillController.getLowRateBillPerMonth);


// RateProduct routes
router.get('/getLowRateProductPerMonth', RateProductController.getLowRateProductPerMonth);
router.delete('/deleteRateProduct/:id', RateProductController.deleteRateProduct);

// Staff routes
router.post('/createStaff', StaffController.addStaff);
router.post('/updateStaff/:id', StaffController.updateStaff);
router.delete('/deleteStaff/:id', StaffController.deleteStaff);
router.post('/checkWorkTimePerMonth/:id', StaffController.checkWorkTimePerMonth);
router.post('/confirmRequestOff/:id', StaffController.confirmRequestOff);
router.get('/getRequestOff', StaffController.getRequestOff);
router.post('/rejectRequestOff/:id', StaffController.rejectRequestOff);
router.get('/getStaffs', StaffController.getStaffs);
router.get('/totalSalary', StaffController.totalSalary);

// User routes
router.get('/getUserByPaied', UserController.getUserByPaied);
router.post('/updateUserRole', UserController.updateUserRole);


// VipPerson routes
router.post('/addVipPerson', VipPersonController.addVipPerson);
router.post('/updateVipPerson/:id', VipPersonController.updateVipPerson);
router.get('/getVipPersons', VipPersonController.getVipPersons);


// Voucher routes

router.post('/createVoucher', VoucherController.createVoucher);
router.post('/activeVoucher/:id', VoucherController.activeVoucher);

module.exports = router;