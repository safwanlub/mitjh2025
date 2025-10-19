const express = require("express");
const router = express.Router();
const mapelController = require("../controllers/mapelController");
const { validateMapel } = require("../middleware/validate"); // Akan kita buat

// Definisi route untuk mapel
router.get("/", mapelController.getAllMapel);
router.get("/:id", mapelController.getMapelById);
router.post("/", validateMapel, mapelController.createMapel); // Akan kita pasang
router.put("/:id", validateMapel, mapelController.updateMapel); // Akan kita pasang
router.delete("/:id", mapelController.deleteMapel);

module.exports = router;
