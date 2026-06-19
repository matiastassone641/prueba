// API de Locales (Bares y Restaurantes)
const express = require('express');
const { db } = require('../config/firebase');

const router = express.Router();

// GET todos los locales
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('locales').get();
    const locales = [];
    snapshot.forEach(doc => {
      locales.push({
        id: doc.id,
        ...doc.data()
      });
    });
    res.json(locales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET un local específico
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('locales').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Local no encontrado' });
    }
    res.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST crear un nuevo local
router.post('/', async (req, res) => {
  try {
    const { nombre, direccion, ciudad, telefono } = req.body;
    const docRef = await db.collection('locales').add({
      nombre,
      direccion,
      ciudad,
      telefono,
      createdAt: new Date(),
      activo: true
    });
    res.json({
      id: docRef.id,
      mensaje: 'Local creado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
