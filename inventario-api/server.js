const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/productos');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/productos', productosRoutes);

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Intento login:', email, password);

  try {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE email = ? AND password = ?',
      [email, password]
    );

    console.log('Resultado BD:', rows);

    if (rows.length === 0) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    res.json({
      message: 'Login exitoso',
      token: 'fake-jwt-token'
    });

  } catch (err) {
    console.log('ERROR SERVIDOR:', err);

    res.status(500).json({
      error: 'Error en el servidor'
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});