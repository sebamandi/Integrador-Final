const express = require('express');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  checkout
} = require('../controllers/cartController');
const router = express.Router();

router
  .route('/')
  .get(getCart)
  .post(addToCart)
  .delete(clearCart);

router
  .route('/:id')
  .put(updateCartItem)
  .delete(removeFromCart);

router
  .route('/checkout')
  .post(checkout);

module.exports = router;
