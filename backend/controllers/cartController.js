const asyncHandler = require('../middleware/asyncHandler');
const Cart = require('../models/Cart');

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

// Procesar el checkout (sin Mercado Pago)
exports.checkout = asyncHandler(async (req, res) => {
  console.log('Datos de la solicitud:', req.body);

  // Verificar que los datos del carrito estén presentes en la solicitud
  const { items } = req.body;
  if (!items || items.length === 0) {
    res.status(400).json({ success: false, message: 'El carrito está vacío' });
    return;
  }

  console.log('Items para el checkout:', items);

  // Simular procesamiento de compra
  try {
    console.log('Simulando procesamiento de compra...');
    // Aquí puedes guardar el pedido en la base de datos si lo deseas
    res.status(200).json({ success: true, message: 'Compra procesada correctamente.' });
  } catch (error) {
    console.error('Error al procesar el checkout:', error);
    res.status(500).json({ success: false, message: 'Error al procesar el checkout' });
  }
});
