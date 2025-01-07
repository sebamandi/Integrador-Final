const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// Middleware de protección modificado para no exigir autenticación
exports.protect = asyncHandler(async (req, res, next) => {
  // La autenticación no es obligatoria, se permite continuar
  next();
});

// Middleware para roles (sin cambios)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `El rol ${req.user.role} no está autorizado para esta acción`,
          403
        )
      );
    }
    next();
  };
};
