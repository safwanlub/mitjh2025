const express = require("express");
const router = express.Router();
const mapelController = require("../controllers/mapelController");
const { validateMapel } = require("../middleware/validate"); // Akan kita buat
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

// Definisi route untuk mapel
router.get("/", mapelController.getAllMapel);
router.get("/:id", mapelController.getMapelById);
router.get(
  "/",
  authenticateToken,
  authorizeRoles("admin", "guru"),
  mapelController.getAllMapel
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "guru"),
  mapelController.getMapelById
);
router.post("/", validateMapel, mapelController.createMapel); // Akan kita pasang
router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  validateMapel,
  mapelController.createMapel
);

router.put("/:id", validateMapel, mapelController.updateMapel); // Akan kita pasang
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  validateMapel,
  mapelController.updateMapel
);

router.delete("/:id", mapelController.deleteMapel);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  mapelController.deleteMapel
);
module.exports = router;
