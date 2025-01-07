const Contact = require('../models/Contact');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

exports.createContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);

  // Intentar enviar email solo si todas las variables de entorno están configuradas
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        subject: 'Nuevo mensaje de contacto',
        message: `
          Nombre: ${req.body.name}
          Email: ${req.body.email}
          Mensaje: ${req.body.message}
        `
      });
    } catch (error) {
      console.log('Error al enviar email:', error);
      // Continuamos aunque falle el envío del email
    }
  }

  res.status(201).json({
    success: true,
    data: contact
  });
});

exports.getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts
  });
});

exports.getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse('Mensaje no encontrado', 404));
  }

  res.status(200).json({
    success: true,
    data: contact
  });
});

exports.updateContact = asyncHandler(async (req, res, next) => {
  let contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse('Mensaje no encontrado', 404));
  }

  contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: contact
  });
});

exports.deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse('Mensaje no encontrado', 404));
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});