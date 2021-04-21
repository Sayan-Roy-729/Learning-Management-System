const express = require('express');

const paymentController = require('../controllers/payment.controller');

const router = express.Router();

// ! api/v1/payment [POST] (Handle the Payments)
router.post('/payment', paymentController.paymentController);

module.exports = router;