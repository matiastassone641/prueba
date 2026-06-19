// API de QR - Generación y validación
const express = require('express');
const { db } = require('../config/firebase');
const QRCode = require('qrcode');

const router = express.Router();

// POST generar QR para una mesa
router.post('/generar', async (req, res) => {
  try {
    const { localId, mesaNumero } = req.body;
    
    // Crear documento de mesa
    const docRef = await db.collection('mesas').add({
      localId,
      numero: mesaNumero,
      codigoUnico: generateUniqueCode(),
      createdAt: new Date(),
      activo: true
    });
    
    // Datos que irán en el QR
    const qrData = {
      localId,
      mesaId: docRef.id,
      mesaNumero
    };
    
    // Generar QR
    const qrImage = await QRCode.toDataURL(JSON.stringify(qrData));
    
    res.json({
      id: docRef.id,
      qr: qrImage,
      mensaje: 'QR generado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET validar QR
router.get('/validar/:codigoUnico', async (req, res) => {
  try {
    const snapshot = await db.collection('mesas')
      .where('codigoUnico', '==', req.params.codigoUnico)
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      return res.status(404).json({ error: 'QR no válido' });
    }
    
    const mesa = snapshot.docs[0];
    res.json({
      id: mesa.id,
      ...mesa.data()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function generateUniqueCode() {
  return 'MESA-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

module.exports = router;
