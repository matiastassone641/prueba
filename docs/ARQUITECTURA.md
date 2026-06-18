# Arquitectura de la Aplicación

## Estructura General

```
app-cobros/
├── backend/          # Node.js + Express
│   ├── api/
│   │   ├── locales.js
│   │   ├── menu.js
│   │   ├── pagos.js
│   │   └── auth.js
│   ├── config/
│   └── server.js
├── frontend/         # React
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.js
│   └── public/
└── docs/
```

## Flujo de Datos

1. **Cliente escanea QR** → identifica mesa/local
2. **Accede al menú** → selecciona items
3. **Realiza pago** → integración con pasarela
4. **Confirmación** → recibo digital

## Base de datos (Firebase)

### Colecciones
- `locales` - Información de bares/restaurantes
- `menu` - Items disponibles
- `mesas` - Mesas con QR único
- `ordenes` - Órdenes activas
- `pagos` - Histórico de pagos

## API Endpoints

### Locales
- `GET /api/locales` - Listar locales
- `GET /api/locales/:id` - Detalle local

### Menú
- `GET /api/menu/:localId` - Menú del local
- `GET /api/menu/:localId/items/:itemId` - Detalle item

### Pagos
- `POST /api/pagos` - Procesar pago
- `GET /api/pagos/:id` - Estado pago

### Órdenes
- `POST /api/ordenes` - Crear orden
- `GET /api/ordenes/:id` - Detalle orden
- `PUT /api/ordenes/:id` - Actualizar orden
