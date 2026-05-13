const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json(rows);
  } catch (err) {
    console.log('ERROR GET PRODUCTOS:', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM productos WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.log('ERROR GET PRODUCTO:', err);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// Agregar producto
router.post('/', async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;

    if (!nombre || precio == null || stock == null) {
      return res.status(400).json({
        error: 'Faltan datos del producto'
      });
    }

    const [result] = await db.query(
      'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
      [nombre, precio, stock]
    );

    res.json({
      id: result.insertId,
      nombre,
      precio,
      stock
    });

  } catch (err) {
    console.log('ERROR POST PRODUCTO:', err);
    res.status(500).json({
      error: 'Error al agregar producto'
    });
  }
});

// Actualizar stock
router.put('/:id', async (req, res) => {
  try {
    const { stock } = req.body;

    console.log('PUT recibido:', req.params.id, stock);

    if (stock == null || isNaN(stock)) {
      return res.status(400).json({
        error: 'Stock inválido'
      });
    }

    const [result] = await db.query(
      'UPDATE productos SET stock = ? WHERE id = ?',
      [stock, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      });
    }

    const [rows] = await db.query(
      'SELECT * FROM productos WHERE id = ?',
      [req.params.id]
    );

    res.json(rows[0]);

  } catch (err) {
    console.log('ERROR PUT PRODUCTO:', err);

    res.status(500).json({
      error: 'Error al actualizar stock'
    });
  }
});

module.exports = router;