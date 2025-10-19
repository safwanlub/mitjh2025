const express = require("express");
const router = express.Router();
const kelasController = require("../controllers/kelasController");
const { validateKelas } = require("../middleware/validate"); // <--- IMPORT MIDDLEWARE

// Route untuk membuat data baru dan mendapatkan semua data
// Harus DIATAS route /:id
router.post("/", kelasController.createKelas);
router.get("/", kelasController.getAllKelas);
router.post("/", validateKelas, kelasController.createKelas); // <--- TAMBAHKAN DI SINI
router.put("/:id", validateKelas, kelasController.updateKelas); // <--- DAN DI SINI

// Route yang menggunakan parameter (/:id)
// Harus PALING BAWAH agar tidak bentrok dengan route di atasnya
router.get("/:id", kelasController.getKelasById);
router.put("/:id", kelasController.updateKelas);
router.delete("/:id", kelasController.deleteKelas);

module.exports = router;
