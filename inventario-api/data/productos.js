const express = require('express');
const router = express.Router();
const db = require('../db'); // ajusta ruta según dónde pusiste db.js

// Buscar por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// Buscar por nombre
router.get('/nombre/:nombre', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos WHERE nombre = ?', [req.params.nombre]);
    if (rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener producto por nombre' });
  }
});

// Agregar producto
router.post('/', async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;
    if (!nombre || !precio || !stock) {
      return res.status(400).json({ error: 'Faltan datos del producto' });
    }
    const [result] = await db.query(
      'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
      [nombre, precio, stock]
    );
    res.json({ id: result.insertId, nombre, precio, stock });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

// Actualizar stock
router.put('/:id', async (req, res) => {
  try {
    const { stock } = req.body;
    if (stock == null) return res.status(400).json({ error: 'Falta el stock' });
    const [result] = await db.query(
      'UPDATE productos SET stock = ? WHERE id = ?',
      [stock, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ id: req.params.id, stock });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar stock' });
  }
});

module.exports = router;
