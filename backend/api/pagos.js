// API de Pagos
const express = require('express');
const { db } = require('../config/firebase');

const router = express.Router();

// POST procesar pago
router.post('/', async (req, res) => {
  try {
    const { ordenId, monto, metodo, referencia } = req.body;
    
    // Validar monto
    if (!monto || monto <= 0) {
      return res.status(400).json({ error: 'Monto inválido' });
    }
    
    // Crear registro de pago
    const docRef = await db.collection('pagos').add({
      ordenId,
      monto: parseFloat(monto),
      metodo, // 'tarjeta', 'efectivo', 'transferencia'
      referencia,
      estado: 'completado',
      createdAt: new Date()
    });
    
    // Actualizar orden
    const ordenDoc = await db.collection('ordenes').doc(ordenId).get();
    if (ordenDoc.exists) {
      const orden = ordenDoc.data();
      const nuevoMontoPagado = (orden.pagado || 0) + monto;
      const nuevoEstado = nuevoMontoPagado >= orden.total ? 'pagada' : 'parcialmente_pagada';
      
      await db.collection('ordenes').doc(ordenId).update({
        pagado: nuevoMontoPagado,
        estado: nuevoEstado,
        updatedAt: new Date()
      });
    }
    
    res.json({
      id: docRef.id,
      mensaje: 'Pago procesado exitosamente',
      monto,
      metodo
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET historial de pagos de una orden
router.get('/orden/:ordenId', async (req, res) => {
  try {
    const snapshot = await db.collection('pagos')
      .where('ordenId', '==', req.params.ordenId)
      .orderBy('createdAt', 'desc')
      .get();
    
    const pagos = [];
    snapshot.forEach(doc => {
      pagos.push({
        id: doc.id,
        ...doc.data()
      });
    });
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
