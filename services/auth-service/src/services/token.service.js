const jwt = require('jsonwebtoken');

// Générer un token d'accès
exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Générer un refresh token
exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' });
};

// Vérifier un token
exports.verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};
