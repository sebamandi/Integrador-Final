const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
console.log('Intentando conectar a MongoDB...');
connectDB()
  .then(() => console.log('MongoDB conectado exitosamente'))
  .catch((err) => {
    console.error('Error al conectar MongoDB:', err);
    process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
  });

const app = express();

// Middleware de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Permitir múltiples orígenes
  credentials: true, 
}));

app.use(express.json());
app.use(morgan('dev'));

// Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Variables de entorno
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Iniciar el servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en modo ${NODE_ENV} en el puerto ${PORT}`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('ERROR NO MANEJADO 💥');
  console.error(err.name, err.message);
  server.close(() => process.exit(1)); // Cerrar el servidor antes de salir
});

// Manejo de errores de puerto ocupado
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`El puerto ${PORT} ya está en uso. Intenta con otro puerto.`);
    process.exit(1);
  } else {
    console.error('Error inesperado en el servidor:', err);
    process.exit(1);
  }
});
