// API de Menú
const express = require('express');
const { db } = require('../config/firebase');

const router = express.Router();

// GET menú de un local
router.get('/:localId', async (req, res) => {
  try {
    const snapshot = await db.collection('menu')
      .where('localId', '==', req.params.localId)
      .where('activo', '==', true)
      .get();
    
    const items = [];
    snapshot.forEach(doc => {
      items.push({
        id: doc.id,
        ...doc.data()
      });
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET item específico
router.get('/:localId/:itemId', async (req, res) => {
  try {
    const doc = await db.collection('menu').doc(req.params.itemId).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }
    res.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST agregar item al menú
router.post('/', async (req, res) => {
  try {
    const { localId, nombre, descripcion, precio, categoria } = req.body;
    const docRef = await db.collection('menu').add({
      localId,
      nombre,
      descripcion,
      precio: parseFloat(precio),
      categoria,
      createdAt: new Date(),
      activo: true
    });
    res.json({
      id: docRef.id,
      mensaje: 'Item agregado al menú'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
