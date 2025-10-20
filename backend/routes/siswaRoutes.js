const express = require("express");
const router = express.Router();
const siswaController = require("../controllers/siswaController");
const { validateSiswa } = require("../middleware/validate");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

// Definisi route untuk siswa
// siswaRoutes.js
// ... tidak perlu authorizeRoles di sini lagi karena sudah di server.js
router.get("/", siswaController.getAllSiswa);
router.get("/:id", siswaController.getSiswaById);
router.post("/", validateSiswa, siswaController.createSiswa);
router.put("/:id", validateSiswa, siswaController.updateSiswa);
router.delete("/:id", siswaController.deleteSiswa);

module.exports = router;
