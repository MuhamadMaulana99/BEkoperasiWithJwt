const jwt = require('jsonwebtoken');
const JWT_SECRET = 'selamatdatangdiduapuluh'; // Pastikan key ini disimpan di environment variables

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token tidak disediakan.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token tidak valid.' });
    }

    req.user = decoded;
    next(); // Lanjutkan ke API berikutnya
  });
};

module.exports = verifyToken;
