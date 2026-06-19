import React, { useRef, useEffect } from 'react';

function QRScanner({ onQRScanned }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Inicializar cámara
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error('Error al acceder a la cámara:', err));
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Aquí iría la lógica de lectura de QR
      console.log('Archivo cargado:', file);
    }
  };

  return (
    <div className="qr-scanner">
      <h2>📱 Escanear QR</h2>
      <video ref={videoRef} autoPlay playsInline />
      <p>Apunta la cámara al código QR de la mesa</p>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileUpload}
        className="btn-secondary"
      />
    </div>
  );
}

export default QRScanner;
