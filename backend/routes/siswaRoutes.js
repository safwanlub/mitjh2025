const express = require("express");
const router = express.Router();
const siswaController = require("../controllers/siswaController");
const { validateSiswa } = require("../middleware/validate");

// Definisi route untuk siswa
router.get("/", siswaController.getAllSiswa);
router.get("/:id", siswaController.getSiswaById);
router.post("/", validateSiswa, siswaController.createSiswa); // <--- TAMBAHKAN DI SINI
router.put("/:id", validateSiswa, siswaController.updateSiswa); // <--- DAN DI SINI
router.post("/", siswaController.createSiswa);
router.put("/:id", siswaController.updateSiswa);
router.delete("/:id", siswaController.deleteSiswa);

module.exports = router;
