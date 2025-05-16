const express = require('express');
const router = express.Router();
const { createPaymentIntent, confirmPayment } = require('../controllers/paymentController');

// Endpoint per creare un PaymentIntent
router.post('/create-payment-intent', createPaymentIntent);

// Endpoint per confermare il pagamento
router.post('/confirm-payment', confirmPayment);

module.exports = router; 