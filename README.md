Javier Alexander Ramos Garcia – RG251044 
Tiffany Nahomy Benitez Reyes – BR250073

# Sistema de Inventario Inteligente

## Descripción del Proyecto

Sistema de inventario inteligente desarrollado bajo arquitectura cliente-servidor, compuesto por una aplicación móvil desarrollada en React Native y una API REST desarrollada en Node.js.

El sistema permite:

- Inicio de sesión seguro mediante autenticación JWT
- Consulta de productos
- Escaneo de códigos QR
- Registro automático de productos mediante QR
- Actualización de stock
- Consumo seguro de endpoints protegidos
- Gestión dinámica de inventario

---

# Tecnologías Utilizadas

## Frontend
- React Native
- Expo
- Axios
- React Navigation
- AsyncStorage
- Expo Camera

## Backend
- Node.js
- Express
- MySQL
- JSON Web Token (JWT)
- CORS

## Base de datos
- MySQL (XAMPP)

---

# Arquitectura del Sistema

El sistema está dividido en dos partes:

## Cliente móvil (inventario-app)

Aplicación móvil encargada de:

- Autenticación
- Consumo de API
- Escaneo QR
- Visualización de productos
- Actualización de inventario

## Servidor API (inventario-api)

Encargado de:

- Validación de usuarios
- Generación de tokens JWT
- Protección de rutas
- Conexión a base de datos
- Gestión de productos

---

# Estructura del Proyecto

## Backend

inventario-api/
│
├── routes/
│   └── productos.js
│
├── db.js
├── server.js
├── package.json

## Frontend

inventario-app/
│
├── screens/
│   ├── LoginScreen.js
│   ├── ProductListScreen.js
│   ├── ProductDetailScreen.js
│   └── QRScannerScreen.js
│
├── App.js
├── app.json
└── package.json

---

# Requisitos Previos

Antes de ejecutar el proyecto instalar:

- Node.js
- Android Studio
- Expo CLI
- XAMPP
- Git
- Dispositivo Android o emulador

---

# Instalación Completa del Proyecto

# 1. Configuración del Backend

Entrar al proyecto:

```bash
cd inventario-api
```

Instalar dependencias:

```bash
npm install
npm install express cors mysql2 jsonwebtoken
```

---

# 2. Configuración de MySQL

Abrir XAMPP y encender:

- Apache
- MySQL

---

# 3. Crear Base de Datos

Abrir phpMyAdmin

Crear base:

```sql
CREATE DATABASE inventario_db;
```

Seleccionarla.

---

# 4. Crear Tabla Usuarios

```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100),
  password VARCHAR(100)
);
```

Insertar usuario:

```sql
INSERT INTO usuarios (email, password)
VALUES ('admin@example.com', '1234');
```

---

# 5. Crear Tabla Productos

```sql
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  precio DECIMAL(10,2),
  stock INT
);
```

Insertar productos de prueba:

```sql
INSERT INTO productos (nombre, precio, stock) VALUES
('Mouse Logitech',25,10),
('Teclado Mecánico',80,5),
('Monitor Samsung',220,3);
```

---

# 6. Configurar Conexión Base de Datos

Archivo: db.js

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'inventario_db'
});

module.exports = pool;
```

---

# 7. Ejecutar Backend

```bash
node server.js
```

Salida esperada:

```bash
Servidor corriendo en http://localhost:3000
```

---

# Configuración del Frontend

Entrar al proyecto:

```bash
cd inventario-app
```

---

# 8. Instalar Dependencias

```bash
npm install
```

Instalar cámara:

```bash
npx expo install expo-camera
```

Instalar almacenamiento:

```bash
npm install @react-native-async-storage/async-storage
```

---

# 9. Limpiar Proyecto Android

```bash
rmdir /s /q android
npx expo prebuild --clean
```

---

# 10. Ejecutar Aplicación

Con dispositivo Android:

```bash
npx expo run:android
```

---

# Configuración del Teléfono

Activar:

## Opciones de desarrollador
Ajustes > Acerca del teléfono > Número de compilación (7 veces)

## Activar:
- Depuración USB
- Instalar por USB

Conectar por cable

Verificar conexión:

```bash
adb devices
```

Debe mostrar:

```bash
XXXXXXXX device
```

---

# Credenciales de Acceso

Usuario:

```text
admin@example.com
```

Contraseña:

```text
1234
```

---

# Manual de Uso

## Inicio de Sesión

1. Abrir aplicación
2. Ingresar correo
3. Ingresar contraseña
4. Presionar Ingresar

El sistema:

- Valida usuario
- Genera token JWT
- Guarda token en AsyncStorage
- Redirige al listado

---

## Visualizar Productos

Después del login se muestra:

- ID
- Nombre
- Stock

---

## Consultar Producto por QR

Presionar:

Escanear QR

Escanear un QR que contenga:

```text
1
```

El sistema consultará:

- Nombre
- Precio
- Stock

---

## Agregar Producto por QR

Escanear QR con JSON:

```json
{
  "nombre": "Cable rosado",
  "precio": 45,
  "stock": 12
}
```

El sistema agregará automáticamente el producto.

---

## Actualizar Stock

1. Seleccionar producto
2. Ingresar nueva cantidad
3. Presionar Actualizar Stock

El sistema actualiza la base de datos inmediatamente.

---

# Seguridad Implementada

## JWT

El sistema genera tokens firmados.

Incluye:

- Identificación del usuario
- Tiempo de expiración

---

## Rutas Protegidas

Se valida:

- Existencia del token
- Firma válida
- Expiración

---

## Encabezado utilizado

```http
Authorization: Bearer <token>
```

---

# Endpoints Disponibles

## Login

```http
POST /login
```

---

## Obtener productos

```http
GET /productos
```

Protegido con token

---

## Obtener producto por ID

```http
GET /productos/:id
```

Protegido

---

## Actualizar stock

```http
PUT /productos/:id
```

Protegido

---

## Agregar producto

```http
POST /productos
```

Protegido

---

# Manejo de Errores

## Credenciales incorrectas

Respuesta:

```http
401 Unauthorized
```

---

## Token inválido

Respuesta:

```http
403 Forbidden
```

---

## Error servidor

Respuesta:

```http
500 Internal Server Error
```

---

# Solución de Problemas

## Error ECONNREFUSED

Causa:
MySQL apagado

Solución:
Encender MySQL en XAMPP

---

## No detecta dispositivo

Ejecutar:

```bash
adb kill-server
adb start-server
adb devices
```

---

## QR no funciona

Debe ser JSON válido

Correcto:

```json
{
  "nombre": "Mouse",
  "precio": 25,
  "stock": 10
}
```

Incorrecto:

```json
nombre: Mouse
```

---

# Autor

Proyecto académico desarrollado como implementación práctica de:

Javier Alexander Ramos Garcia – RG251044 
Tiffany Nahomy Benitez Reyes – BR250073

- React Native
- API REST
- Seguridad JWT
- Gestión de inventarios móviles
