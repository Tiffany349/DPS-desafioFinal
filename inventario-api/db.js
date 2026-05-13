// db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  port: 3306,            // puerto de MySQL en XAMPP
  user: 'root',          // usuario por defecto
  password: '',          // vacío si no configuraste contraseña
  database: 'inventario' // nombre de la BD creada
});

module.exports = db;
