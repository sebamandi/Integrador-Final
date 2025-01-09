const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Middleware de protección: verifica el token y establece req.user
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Verificar si el token viene en los headers o en las cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse('No autorizado. Token no encontrado.', 401));
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorResponse('No autorizado. Usuario no encontrado.', 401));
    }

    next();
  } catch (err) {
    return next(new ErrorResponse('No autorizado. Token inválido.', 401));
  }
});

// Middleware para autorizar roles específicos
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `El rol ${req.user?.role || 'desconocido'} no está autorizado para esta acción.`,
          403
        )
      );
    }
    next();
  };
};
