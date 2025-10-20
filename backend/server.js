const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./models");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require("./routes/authRoutes");
const siswaRoutes = require("./routes/siswaRoutes");
const kelasRoutes = require("./routes/kelasRoutes");
const mapelRoutes = require("./routes/mapelRoutes");
const nilaiRoutes = require("./routes/nilaiRoutes");
const kelasMapelRoutes = require("./routes/kelasMapelRoutes");
const { authenticateToken, authorizeRoles } = require("./middleware/auth");

// Gunakan routes
app.use("/api/auth", authRoutes);

app.use("/api/siswa", authenticateToken, authorizeRoles("admin"), siswaRoutes); // <--- PERHATIKAN INI
app.use("/api/kelas", authenticateToken, authorizeRoles("admin"), kelasRoutes);
app.use("/api/mapel", authenticateToken, authorizeRoles("admin"), mapelRoutes);
app.use(
  "/api/nilai",
  authenticateToken,
  authorizeRoles("admin", "guru"),
  nilaiRoutes
);
app.use("/api", authenticateToken, authorizeRoles("admin"), kelasMapelRoutes);

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MIT-JH API." });
});

// Sync database and start server
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
