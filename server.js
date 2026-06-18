// Servidor principal de la app de cobros
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ mensaje: 'Bienvenido a la app de cobros' });
});

// Rutas para locales
app.get('/api/locales', (req, res) => {
  res.json({ locales: [] });
});

// Rutas para menú
app.get('/api/menu/:localId', (req, res) => {
  res.json({ items: [] });
});

// Rutas para pagos
app.post('/api/pagos', (req, res) => {
  res.json({ exito: true, mensaje: 'Pago procesado' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
