const express = require("express");
const router = express.Router();
const kelasMapelController = require("../controllers/kelasMapelController");

// Route untuk menambahkan mapel ke kelas
// POST /api/kelas/1/mapel/2
router.post(
  "/kelas/:kelasId/mapel/:mapelId",
  kelasMapelController.addMapelToKelas
);

// Route untuk menghapus mapel dari kelas
// DELETE /api/kelas/1/mapel/2
router.delete(
  "/kelas/:kelasId/mapel/:mapelId",
  kelasMapelController.removeMapelFromKelas
);

// Route untuk melihat semua mapel di kelas tertentu
// GET /api/kelas/1/mapel
router.get("/kelas/:kelasId/mapel", kelasMapelController.getMapelsInKelas);

module.exports = router;
