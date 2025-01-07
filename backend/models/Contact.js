const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingrese un nombre']
  },
  email: {
    type: String,
    required: [true, 'Por favor ingrese un email'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor ingrese un email válido'
    ]
  },
  message: {
    type: String,
    required: [true, 'Por favor ingrese un mensaje'],
    minlength: [10, 'El mensaje debe tener al menos 10 caracteres']
  },
  status: {
    type: String,
    enum: ['pending', 'read', 'responded'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', ContactSchema);