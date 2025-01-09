const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router
  .route('/')
  .get(getProducts)
  .post(protect, authorize('admin','user'), upload.single('image'), createProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(protect, authorize('admin'), upload.single('image'), updateProduct)
  .delete(protect, authorize('admin','user'), deleteProduct);

module.exports = router;