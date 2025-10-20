const { Nilai, Siswa, Mapel } = require("../models");

// Mendapatkan semua nilai
exports.getAllNilai = async (req, res) => {
  try {
    const nilaiList = await Nilai.findAll({
      include: [
        { model: Siswa, as: "Siswa", attributes: ["id", "nama"] }, // Hanya tampilkan id dan nama siswa
        { model: Mapel, as: "Mapel", attributes: ["id", "nama_mapel"] }, // Hanya tampilkan id dan nama mapel
      ],
    });
    res.json(nilaiList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Mendapatkan nilai berdasarkan ID
exports.getNilaiById = async (req, res) => {
  try {
    const nilai = await Nilai.findByPk(req.params.id, {
      include: [
        { model: Siswa, as: "Siswa" },
        { model: Mapel, as: "Mapel" },
      ],
    });
    if (nilai) {
      res.json(nilai);
    } else {
      res.status(404).json({ message: "Nilai tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Menambah nilai baru
exports.createNilai = async (req, res) => {
  try {
    const newNilai = await Nilai.create(req.body);
    res.status(201).json(newNilai);
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res
      .status(500)
      .json({ message: "Gagal menambah nilai", error: error.message });
  }
};

// Memperbarui data nilai
exports.updateNilai = async (req, res) => {
  try {
    const [updated] = await Nilai.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedNilai = await Nilai.findByPk(req.params.id);
      res.json(updatedNilai);
    } else {
      res.status(404).json({ message: "Nilai tidak ditemukan" });
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
      .json({ message: "Gagal memperbarui nilai", error: error.message });
  }
};

// Menghapus nilai
exports.deleteNilai = async (req, res) => {
  try {
    const deleted = await Nilai.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Nilai berhasil dihapus" });
    } else {
      res.status(404).json({ message: "Nilai tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus nilai", error: error.message });
  }
};
