const express = require("express");
const router = express.Router();
const nilaiController = require("../controllers/nilaiController");
const { validateNilai } = require("../middleware/validate"); // Akan kita buat

// Definisi route untuk nilai
router.get("/", nilaiController.getAllNilai);
router.get("/:id", nilaiController.getNilaiById);
router.post("/", validateNilai, nilaiController.createNilai);
router.put("/:id", validateNilai, nilaiController.updateNilai);
router.delete("/:id", nilaiController.deleteNilai);

module.exports = router;
