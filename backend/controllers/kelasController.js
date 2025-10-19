const { Kelas, Siswa, Mapel } = require("../models");

// Mendapatkan semua kelas
exports.getAllKelas = async (req, res) => {
  try {
    const kelasList = await Kelas.findAll({
      include: [
        { model: Siswa, as: "Siswas" },
        { model: Mapel, as: "Mapels" }, // <--- TAMBAHKAN INI
      ],
    });
    res.json(kelasList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Mendapatkan kelas berdasarkan ID
exports.getKelasById = async (req, res) => {
  try {
    const kelas = await Kelas.findByPk(req.params.id, {
      include: [
        { model: Siswa, as: "Siswas" },
        { model: Mapel, as: "Mapels" }, // <--- TAMBAHKAN INI
      ],
    });
    if (kelas) {
      res.json(kelas);
    } else {
      res.status(404).json({ message: "Kelas tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Menambah kelas baru
exports.createKelas = async (req, res) => {
  try {
    const newKelas = await Kelas.create(req.body);
    res.status(201).json(newKelas);
  } catch (error) {
    // Tangkap error dari validasi Sequelize
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      // Jika error validasi, kirim status 400 dengan pesan dari Sequelize
      return res.status(400).json({ message: error.errors[0].message });
    }
    // Error lainnya
    res
      .status(500)
      .json({ message: "Gagal menambah kelas", error: error.message });
  }
};

// Memperbarui data kelas
exports.updateKelas = async (req, res) => {
  try {
    const [updated] = await Kelas.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedKelas = await Kelas.findByPk(req.params.id);
      res.json(updatedKelas);
    } else {
      res.status(404).json({ message: "Kelas tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Gagal memperbarui kelas", error: error.message });
  }
};

// Menghapus kelas
exports.deleteKelas = async (req, res) => {
  try {
    const deleted = await Kelas.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Kelas berhasil dihapus" });
    } else {
      res.status(404).json({ message: "Kelas tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus kelas", error: error.message });
  }
};
