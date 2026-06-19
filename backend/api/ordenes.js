// API de Órdenes
const express = require('express');
const { db } = require('../config/firebase');

const router = express.Router();

// POST crear nueva orden
router.post('/', async (req, res) => {
  try {
    const { localId, mesaId, items } = req.body;
    
    const docRef = await db.collection('ordenes').add({
      localId,
      mesaId,
      items,
      total: calcularTotal(items),
      pagado: 0,
      estado: 'activa',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    res.json({
      id: docRef.id,
      mensaje: 'Orden creada'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET orden específica
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('ordenes').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    res.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT actualizar orden
router.put('/:id', async (req, res) => {
  try {
    const { items, estado } = req.body;
    await db.collection('ordenes').doc(req.params.id).update({
      items: items || undefined,
      estado: estado || undefined,
      updatedAt: new Date()
    });
    res.json({ mensaje: 'Orden actualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function calcularTotal(items) {
  return items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
}

module.exports = router;
