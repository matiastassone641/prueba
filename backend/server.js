// Servidor principal
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const localesRouter = require('./api/locales');
const menuRouter = require('./api/menu');
const ordenesRouter = require('./api/ordenes');
const pagosRouter = require('./api/pagos');
const qrRouter = require('./api/qr');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/locales', localesRouter);
app.use('/api/menu', menuRouter);
app.use('/api/ordenes', ordenesRouter);
app.use('/api/pagos', pagosRouter);
app.use('/api/qr', qrRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de Cobros Parciales - Bares y Restaurantes',
    version: '1.0.0',
    endpoints: [
      'GET /api/locales',
      'GET /api/menu/:localId',
      'POST /api/ordenes',
      'POST /api/pagos',
      'GET /api/qr/validar/:codigo'
    ]
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
});
