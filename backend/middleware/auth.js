const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  console.log(
    "Middleware authenticateToken dipanggil untuk URL:",
    req.originalUrl
  );
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET || "rahasia_kita", (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user; // Tambahkan data user ke request
    next();
  });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // req.user sudah diisi oleh middleware authenticateToken
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Anda tidak memiliki izin untuk mengakses resource ini",
      });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles,
};
