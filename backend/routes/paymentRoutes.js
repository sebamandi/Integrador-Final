const express = require('express');
const router = express.Router();
const { createPayment, handleWebhook } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.post('/create-preference', protect, createPayment);
router.post('/webhook', handleWebhook);

module.exports = router;