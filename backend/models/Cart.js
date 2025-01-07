const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'La cantidad debe ser al menos 1']
  },
  price: {
    type: Number,
    required: true
  }
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [CartItemSchema],
  status: {
    type: String,
    enum: ['active', 'completed', 'abandoned'],
    default: 'active'
  },
  total: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Middleware para calcular el total antes de guardar
CartSchema.pre('save', async function(next) {
  this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  next();
});

// Método para agregar un producto al carrito
CartSchema.methods.addItem = async function(productId, quantity, price) {
  const existingItem = this.items.find(item => 
    item.product.toString() === productId.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({ product: productId, quantity, price });
  }

  return this.save();
};

// Método para remover un producto del carrito
CartSchema.methods.removeItem = async function(productId) {
  this.items = this.items.filter(item => 
    item.product.toString() !== productId.toString()
  );
  return this.save();
};

// Método para actualizar la cantidad de un producto
CartSchema.methods.updateQuantity = async function(productId, quantity) {
  const item = this.items.find(item => 
    item.product.toString() === productId.toString()
  );
  
  if (item) {
    item.quantity = quantity;
    return this.save();
  }
  
  throw new Error('Producto no encontrado en el carrito');
};

module.exports = mongoose.model('Cart', CartSchema);