const asyncHandler = require('../middleware/asyncHandler');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { createPreference } = require('../services/mercadopagoService');

// Obtener el carrito del usuario
exports.getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.sessionID, status: 'active' }).populate('items.product');
  res.status(200).json({ success: true, data: cart || { items: [] } });
});

// Agregar un producto al carrito
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.sessionID, status: 'active' });

  if (!cart) {
    cart = await Cart.create({ userId: req.sessionID, items: [] });
  }

  const productIndex = cart.items.findIndex((item) => item.product.toString() === productId);
  if (productIndex >= 0) {
    cart.items[productIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(200).json({ success: true, data: cart });
});

// Actualizar cantidad de un producto en el carrito
exports.updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOneAndUpdate(
    { userId: req.sessionID, 'items.product': req.params.id },
    { $set: { 'items.$.quantity': quantity } },
    { new: true }
  ).populate('items.product');

  res.status(200).json({ success: true, data: cart });
});

// Eliminar un producto del carrito
exports.removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.sessionID },
    { $pull: { items: { product: req.params.id } } },
    { new: true }
  ).populate('items.product');

  res.status(200).json({ success: true, data: cart });
});

// Vaciar el carrito
exports.clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.sessionID },
    { $set: { items: [] } },
    { new: true }
  );

  res.status(200).json({ success: true, data: cart });
});

// Procesar el checkout
exports.checkout = asyncHandler(async (req, res) => {
  console.log('Datos de la solicitud:', req.body);

  // Verificar que los datos del carrito estén presentes en la solicitud
  const { items } = req.body;
  if (!items || items.length === 0) {
    res.status(400).json({ success: false, message: 'El carrito está vacío' });
    return;
  }

  console.log('Items para el checkout:', items);

  // Procesar los datos para MercadoPago
  const preferenceItems = items.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity
  }));

  try {
    const preference = await createPreference(preferenceItems, { email: 'cliente@prueba.com' });
    console.log('Preferencia creada:', preference.body);

    res.status(200).json({ success: true, data: preference.body });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({ success: false, message: 'Error al procesar el checkout' });
  }
});
