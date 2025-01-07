const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const { category, brand, minPrice, maxPrice, search } = req.query;
  let query = {};

  // Filtros
  if (category) query.category = category;
  if (brand) query.brand = brand;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const products = await Product.find(query);

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// @desc    Obtener un producto
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse('Producto no encontrado', 404));
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Crear un producto
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = asyncHandler(async (req, res) => {
  // Si hay un archivo subido, agregar la URL de la imagen
  if (req.file) {
    req.body.imageUrl = `/uploads/${req.file.filename}`;
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse('Producto no encontrado', 404));
  }

  // Si hay un archivo subido, actualizar la URL de la imagen
  if (req.file) {
    req.body.imageUrl = `/uploads/${req.file.filename}`;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Eliminar un producto
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse('Producto no encontrado', 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});