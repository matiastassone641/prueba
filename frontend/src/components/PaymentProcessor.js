import React, { useState } from 'react';

function PaymentProcessor({ items, ordenId, onPaymentComplete }) {
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [reference, setReference] = useState('');

  const total = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const pendiente = total - (amount ? parseFloat(amount) : 0);

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Ingresa un monto válido');
      return;
    }

    setProcessing(true);
    try {
      const response = await fetch('/api/pagos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ordenId,
          monto: parseFloat(amount),
          metodo: paymentMethod,
          referencia: reference
        })
      });

      const data = await response.json();
      if (response.ok) {
        onPaymentComplete({
          ...data,
          metodoPago: paymentMethod,
          montoTotal: total,
          montoPagado: parseFloat(amount)
        });
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error al procesar pago:', error);
      alert('Error al procesar el pago');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="payment-processor">
      <h2>💳 Procesar Pago</h2>
      
      <div className="payment-summary">
        <h3>Resumen</h3>
        <div>Total: <strong>${total.toFixed(2)}</strong></div>
        <div>A pagar: <strong>${amount || '0.00'}</strong></div>
        {parseFloat(amount) < total && (
          <div className="pending">Pendiente: ${pendiente.toFixed(2)}</div>
        )}
      </div>

      <div className="payment-methods">
        <label>
          <input 
            type="radio" 
            value="tarjeta" 
            checked={paymentMethod === 'tarjeta'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          💳 Tarjeta
        </label>
        <label>
          <input 
            type="radio" 
            value="efectivo" 
            checked={paymentMethod === 'efectivo'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          💵 Efectivo
        </label>
        <label>
          <input 
            type="radio" 
            value="transferencia" 
            checked={paymentMethod === 'transferencia'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          🏦 Transferencia
        </label>
      </div>

      <input 
        type="number" 
        placeholder="Monto a pagar"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        step="0.01"
        min="0"
        max={total}
      />

      {paymentMethod === 'transferencia' && (
        <input 
          type="text" 
          placeholder="Referencia/Comprobante"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
      )}

      <button 
        onClick={handlePayment}
        disabled={processing || !amount}
        className="btn-primary"
      >
        {processing ? 'Procesando...' : 'Confirmar Pago'}
      </button>
    </div>
  );
}

export default PaymentProcessor;
