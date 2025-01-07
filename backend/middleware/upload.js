const multer = require('multer');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// Validación de archivos
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(
    new ErrorResponse(
      'Error: Solo se permiten archivos de imagen (.jpg, .jpeg, .png, .webp)!',
      400
    )
  );
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000 // 5MB max
  },
  fileFilter: fileFilter
});

module.exports = upload;