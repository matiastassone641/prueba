import React, { useState, useEffect } from 'react';

function MenuSelector({ localId, onItemsSelected }) {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu();
  }, [localId]);

  const fetchMenu = async () => {
    try {
      const response = await fetch(`/api/menu/${localId}`);
      const data = await response.json();
      setMenuItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar menú:', error);
      setLoading(false);
    }
  };

  const toggleItem = (item) => {
    const exists = selectedItems.find(i => i.id === item.id);
    if (exists) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, { ...item, cantidad: 1 }]);
    }
  };

  const updateCantidad = (itemId, cantidad) => {
    setSelectedItems(selectedItems.map(item =>
      item.id === itemId ? { ...item, cantidad } : item
    ));
  };

  const total = selectedItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  if (loading) return <div className="loading">Cargando menú...</div>;

  return (
    <div className="menu-selector">
      <h2>🍽️ Selecciona tu menú</h2>
      
      <div className="menu-items">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            <h3>{item.nombre}</h3>
            <p>{item.descripcion}</p>
            <span className="price">${item.precio}</span>
            <button 
              onClick={() => toggleItem(item)}
              className={selectedItems.find(i => i.id === item.id) ? 'btn-active' : ''}
            >
              {selectedItems.find(i => i.id === item.id) ? '✓ Agregado' : 'Agregar'}
            </button>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <div className="selected-items">
          <h3>Tu pedido:</h3>
          {selectedItems.map(item => (
            <div key={item.id} className="selected-item">
              <span>{item.nombre}</span>
              <input 
                type="number" 
                min="1" 
                value={item.cantidad}
                onChange={(e) => updateCantidad(item.id, parseInt(e.target.value))}
              />
              <span>${(item.precio * item.cantidad).toFixed(2)}</span>
            </div>
          ))}
          <div className="total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <button 
            onClick={() => onItemsSelected(selectedItems)}
            className="btn-primary"
          >
            Proceder al pago
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuSelector;
