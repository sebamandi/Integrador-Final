const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede tener más de 100 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    maxlength: [1000, 'La descripción no puede tener más de 1000 caracteres']
  },
  shortDescription: {
    type: String,
    required: [true, 'La descripción corta es requerida'],
    maxlength: [200, 'La descripción corta no puede tener más de 200 caracteres']
  },
  stock: {
    type: Number,
    required: [true, 'El stock es requerido'],
    min: [0, 'El stock no puede ser negativo']
  },
  imageUrl: {
    type: String,
    required: [true, 'La imagen es requerida']
  },
  brand: {
    type: String,
    required: [true, 'La marca es requerida'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'La categoría es requerida'],
    enum: ['Palos', 'Patines', 'Protecciones', 'Cascos', 'Guantes', 'Accesorios']
  },
  freeShipping: {
    type: Boolean,
    default: false
  },
  ageFrom: {
    type: Number,
    min: [0, 'La edad mínima no puede ser negativa']
  },
  ageTo: {
    type: Number,
    min: [0, 'La edad máxima no puede ser negativa']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual para verificar si hay stock
ProductSchema.virtual('inStock').get(function() {
  return this.stock > 0;
});

module.exports = mongoose.model('Product', ProductSchema);