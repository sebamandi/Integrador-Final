const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const mercadopagoService = require('../services/mercadopagoService');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const { Payment } = require('mercadopago');

exports.createPayment = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ 
    userId: req.user.id,
    status: 'active'
  }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    return next(new ErrorResponse('Carrito vacío', 400));
  }

  const items = cart.items.map(item => ({
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    imageUrl: item.product.imageUrl
  }));

  const preference = await mercadopagoService.createPreference(items, {
    name: req.user.name,
    email: req.user.email
  });

  res.json({
    success: true,
    data: preference
  });
});

exports.handleWebhook = asyncHandler(async (req, res) => {
  const { type, data } = req.body;

  if (type === 'payment') {
    const paymentId = data.id;
    const payment = new Payment(client);
    const paymentData = await payment.get({ id: paymentId });
    
    if (paymentData.status === 'approved') {
      const order = await Order.findOne({ 
        external_reference: paymentData.external_reference 
      });
      
      if (order) {
        order.status = 'paid';
        await order.save();
      }
    }
  }

  res.status(200).json({ received: true });
});