const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Obtener todos
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json(rows);
  } catch (err) {
    res.status(500).json({
      error: 'Error al obtener productos'
    });
  }
});

// Obtener por ID
router.get('/:id', auth, async (req, res) => {
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
    res.status(500).json({
      error: 'Error al obtener producto'
    });
  }
});

// Agregar producto
router.post('/', auth, async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;

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
    res.status(500).json({
      error: 'Error al agregar producto'
    });
  }
});

// Actualizar stock
router.put('/:id', auth, async (req, res) => {
  try {
    const { stock } = req.body;

    if (stock < 0) {
      return res.status(400).json({
        error: 'No se permite stock negativo'
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
    res.status(500).json({
      error: 'Error al actualizar stock'
    });
  }
});

module.exports = router;