// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer "))
    return res.status(401).json({ message: "Not authorized" });

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
};
