const express = require("express");
const router = express.Router();
const nilaiController = require("../controllers/nilaiController");
const { validateNilai } = require("../middleware/validate"); // Akan kita buat
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

// Definisi route untuk nilai
router.get("/", nilaiController.getAllNilai);
router.get("/:id", nilaiController.getNilaiById);
router.get(
  "/",
  authenticateToken,
  authorizeRoles("admin", "guru"),
  nilaiController.getAllNilai
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "guru"),
  nilaiController.getNilaiById
);
router.post("/", validateNilai, nilaiController.createNilai);
router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  validateNilai,
  nilaiController.createNilai
);
router.put("/:id", validateNilai, nilaiController.updateNilai);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  validateNilai,
  nilaiController.updateNilai
);
router.delete("/:id", nilaiController.deleteNilai);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  nilaiController.deleteNilai
);
module.exports = router;
