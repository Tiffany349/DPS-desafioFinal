const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const productosRoutes = require('./routes/productos');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Intento login:', email, password);

  try {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    const usuario = rows[0];

    // JWT real
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email
      },
      'mi_clave_secreta',
      {
        expiresIn: '1h'
      }
    );

    res.json({
      message: 'Login exitoso',
      token
    });

  } catch (err) {
    console.log('ERROR SERVIDOR:', err);
    res.status(500).json({
      error: 'Error en el servidor'
    });
  }
});

// Rutas productos
app.use('/productos', productosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});