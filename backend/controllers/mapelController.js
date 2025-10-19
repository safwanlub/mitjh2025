const { Mapel } = require("../models"); // Import model Mapel

// Mendapatkan semua mapel
exports.getAllMapel = async (req, res) => {
  try {
    const mapelList = await Mapel.findAll();
    res.json(mapelList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Mendapatkan mapel berdasarkan ID
exports.getMapelById = async (req, res) => {
  try {
    const mapel = await Mapel.findByPk(req.params.id);
    if (mapel) {
      res.json(mapel);
    } else {
      res.status(404).json({ message: "Mapel tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Menambah mapel baru
exports.createMapel = async (req, res) => {
  try {
    const newMapel = await Mapel.create(req.body);
    res.status(201).json(newMapel);
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res
      .status(500)
      .json({ message: "Gagal menambah mapel", error: error.message });
  }
};

// Memperbarui data mapel
exports.updateMapel = async (req, res) => {
  try {
    const [updated] = await Mapel.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedMapel = await Mapel.findByPk(req.params.id);
      res.json(updatedMapel);
    } else {
      res.status(404).json({ message: "Mapel tidak ditemukan" });
    }
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res
      .status(400)
      .json({ message: "Gagal memperbarui mapel", error: error.message });
  }
};

// Menghapus mapel
exports.deleteMapel = async (req, res) => {
  try {
    const deleted = await Mapel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Mapel berhasil dihapus" });
    } else {
      res.status(404).json({ message: "Mapel tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus mapel", error: error.message });
  }
};
