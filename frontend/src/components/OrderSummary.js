import React from 'react';

function OrderSummary({ order, onNewOrder }) {
  return (
    <div className="order-summary">
      <h2>✅ ¡Pago Procesado!</h2>
      
      <div className="summary-content">
        <div className="summary-item">
          <span>ID Pago:</span>
          <strong>{order.id}</strong>
        </div>
        <div className="summary-item">
          <span>Monto:</span>
          <strong>${order.montoPagado?.toFixed(2)}</strong>
        </div>
        <div className="summary-item">
          <span>Método:</span>
          <strong>{order.metodoPago}</strong>
        </div>
        <div className="summary-item">
          <span>Total de la cuenta:</span>
          <strong>${order.montoTotal?.toFixed(2)}</strong>
        </div>
        {order.montoTotal - order.montoPagado > 0 && (
          <div className="summary-item pending">
            <span>Pendiente:</span>
            <strong>${(order.montoTotal - order.montoPagado).toFixed(2)}</strong>
          </div>
        )}
      </div>

      <div className="qr-receipt">
        <p>Código de recibo:</p>
        <code>{order.id}</code>
      </div>

      <button onClick={onNewOrder} className="btn-primary">
        🏠 Volver al inicio
      </button>
    </div>
  );
}

export default OrderSummary;
