const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || req.header('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : (req.cookies && req.cookies.token);

  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role }; // you can add more fields if saved in token
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is not valid' });
  }
};
