const express = require('express');
const router = express.Router();

const BillController = require('../controller_Staff/BillController');
const BillDetailController = require('../controller_Staff/BillDetailController');
const StaffController = require('../controller_Staff/StaffController');


// Bill routes

router.delete('/deleteBill/:id', BillController.deleteBill);
router.get('/getBillPending', BillController.getBillPending);
router.post('/payBillwithCreditCard/:billId', BillController.payBillwithCreditCard);
router.post('/payBilwithMoney/:billId', BillController.payBilwithMoney);


// BillDetail routes
router.post('/changeStatusBillDetailToDoing/:id', BillDetailController.changeStatusBillDetailToDoing);
router.post('/changeStatusBillDetailToDone/:id', BillDetailController.changeStatusBillDetailToDone);
router.post('/changeStatusBillDetailToPending/:id', BillDetailController.changeStatusBillDetailToPending);
router.get('/getBillDetailDoing', BillDetailController.getBillDetailDoing);
router.get('/getBillDetailDone', BillDetailController.getBillDetailDone);
router.get('/getBillDetailPending', BillDetailController.getBillDetailPending);


// Staff routes

router.post('/checkOut/:id', StaffController.checkOut);
router.post('/checkIn/:id', StaffController.checkIn);
router.post('/createRequestOff/:id', StaffController.createRequestOff);


module.exports = router;