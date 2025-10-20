const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route untuk register dan login tidak perlu diproteksi
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
