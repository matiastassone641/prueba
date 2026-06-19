# 📱 Guía de Instalación - App de Cobros

## Requisitos Previos
- Node.js v14+
- npm o yarn
- Git
- Cuenta de Firebase (gratuita)

## Paso 1: Clonar el repositorio

```bash
git clone https://github.com/matiastassone641/prueba.git
cd prueba
```

## Paso 2: Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Copia tu ID de proyecto
4. Descarga el archivo `serviceAccountKey.json`
5. Guárdalo en la raíz del proyecto

## Paso 3: Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus datos de Firebase:

```
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_DATABASE_URL=https://tu-proyecto.firebaseio.com
```

## Paso 4: Instalar dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Paso 5: Ejecutar la aplicación

### Terminal 1 - Backend:

```bash
cd backend
npm run dev
```

Debe mostrar:
```
✅ Servidor corriendo en puerto 3000
📍 URL: http://localhost:3000
```

### Terminal 2 - Frontend:

```bash
cd frontend
npm start
```

Se abrirá automáticamente en `http://localhost:3000`

## Estructura de Datos en Firebase

### Colecciones necesarias:

#### 1. `locales`
```json
{
  "nombre": "Bar La Esquina",
  "direccion": "Calle Principal 123",
  "ciudad": "Ciudad",
  "telefono": "123456789",
  "activo": true,
  "createdAt": "2024-01-01"
}
```

#### 2. `menu`
```json
{
  "localId": "id-del-local",
  "nombre": "Cerveza Artesanal",
  "descripcion": "Cerveza IPA 500ml",
  "precio": 5.50,
  "categoria": "bebidas",
  "activo": true,
  "createdAt": "2024-01-01"
}
```

#### 3. `mesas`
```json
{
  "localId": "id-del-local",
  "numero": 1,
  "codigoUnico": "MESA-123456-abc123",
  "activo": true,
  "createdAt": "2024-01-01"
}
```

#### 4. `ordenes`
```json
{
  "localId": "id-del-local",
  "mesaId": "id-mesa",
  "items": [
    {
      "id": "item-id",
      "nombre": "Cerveza",
      "precio": 5.50,
      "cantidad": 2
    }
  ],
  "total": 11.00,
  "pagado": 0,
  "estado": "activa",
  "createdAt": "2024-01-01",
  "updatedAt": "2024-01-01"
}
```

#### 5. `pagos`
```json
{
  "ordenId": "id-orden",
  "monto": 5.50,
  "metodo": "tarjeta",
  "referencia": "ABC123",
  "estado": "completado",
  "createdAt": "2024-01-01"
}
```

## Endpoints de la API

### Locales
- `GET /api/locales` - Listar todos
- `GET /api/locales/:id` - Obtener uno
- `POST /api/locales` - Crear

### Menú
- `GET /api/menu/:localId` - Menú del local
- `POST /api/menu` - Agregar item

### Órdenes
- `POST /api/ordenes` - Crear orden
- `GET /api/ordenes/:id` - Obtener orden
- `PUT /api/ordenes/:id` - Actualizar

### Pagos
- `POST /api/pagos` - Procesar pago
- `GET /api/pagos/orden/:ordenId` - Historial

### QR
- `POST /api/qr/generar` - Generar QR
- `GET /api/qr/validar/:codigo` - Validar QR

## Solución de Problemas

### Error: "Firebase not initialized"
- Verifica que `serviceAccountKey.json` esté en la raíz
- Comprueba las variables de `.env`

### Error: "Port 3000 already in use"
- Usa un puerto diferente: `PORT=3001 npm run dev`

### Error: "Module not found"
- Ejecuta `npm install` nuevamente
- Elimina `node_modules` y `package-lock.json`, luego reinstala

## Próximos pasos

1. ✅ Integrar Mercado Pago
2. ✅ Generar códigos QR reales
3. ✅ Panel de administración
4. ✅ Reportes y estadísticas
5. ✅ App móvil nativa (React Native)

## Soporte

Para preguntas, contacta al equipo de desarrollo.
