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
const siswaRoutes = require("./routes/siswaRoutes");
const kelasRoutes = require("./routes/kelasRoutes");
const mapelRoutes = require("./routes/mapelRoutes");
const kelasMapelRoutes = require("./routes/kelasMapelRoutes");
const nilaiRoutes = require("./routes/nilaiRoutes");

// Gunakan routes
app.use("/api/siswa", siswaRoutes);
app.use("/api/kelas", kelasRoutes);
app.use("/api/mapel", mapelRoutes);
app.use("/api", kelasMapelRoutes);
app.use("/api/nilai", nilaiRoutes);

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
