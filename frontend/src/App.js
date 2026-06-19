import React, { useState } from 'react';
import './App.css';
import QRScanner from './components/QRScanner';
import MenuSelector from './components/MenuSelector';
import PaymentProcessor from './components/PaymentProcessor';
import OrderSummary from './components/OrderSummary';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleQRScanned = (data) => {
    setSelectedLocal(data.localId);
    setSelectedMesa(data.mesaId);
    setCurrentView('menu');
  };

  const handleItemsSelected = (items) => {
    setSelectedItems(items);
    setCurrentView('payment');
  };

  const handlePaymentComplete = (order) => {
    setCurrentOrder(order);
    setCurrentView('summary');
  };

  return (
    <div className="App">
      {currentView === 'home' && (
        <div className="home-view">
          <h1>💳 App de Cobros</h1>
          <p>Pagos parciales para bares y restaurantes</p>
          <button onClick={() => setCurrentView('scan')} className="btn-primary">
            📱 Escanear QR
          </button>
        </div>
      )}

      {currentView === 'scan' && (
        <QRScanner onQRScanned={handleQRScanned} />
      )}

      {currentView === 'menu' && (
        <MenuSelector 
          localId={selectedLocal}
          onItemsSelected={handleItemsSelected}
        />
      )}

      {currentView === 'payment' && (
        <PaymentProcessor 
          items={selectedItems}
          ordenId={selectedMesa}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {currentView === 'summary' && (
        <OrderSummary 
          order={currentOrder}
          onNewOrder={() => {
            setCurrentView('home');
            setSelectedItems([]);
            setCurrentOrder(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
