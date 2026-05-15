const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      error: 'Token requerido'
    });
  }

  const token = authHeader.split(' ')[1];//.
//..
  jwt.verify(token, 'mi_clave_secreta', (err, user) => {
    if (err) {
      return res.status(403).json({
        error: 'Token inválido o expirado'
      });
    }

    req.user = user;
    next();
  });
};

module.exports = auth;