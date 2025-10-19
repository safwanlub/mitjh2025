const { Siswa } = require("../models");

// Mendapatkan semua siswa
exports.getAllSiswa = async (req, res) => {
  try {
    // TAMBAHKAN 'include' untuk mengambil data Kelas terkait
    const siswaList = await Siswa.findAll({
      include: ["Kelas"], // 'Kelas' adalah nama model yang kita definisikan di associate
    });
    res.json(siswaList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Mendapatkan siswa berdasarkan ID
exports.getSiswaById = async (req, res) => {
  try {
    // TAMBAHKAN 'include' di sini juga
    const siswa = await Siswa.findByPk(req.params.id, {
      include: ["Kelas"],
    });
    if (siswa) {
      res.json(siswa);
    } else {
      res.status(404).json({ message: "Siswa tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// ... (fungsi create, update, delete tidak perlu diubah)
exports.createSiswa = async (req, res) => {
  try {
    const newSiswa = await Siswa.create(req.body);
    res.status(201).json(newSiswa);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Gagal menambah siswa", error: error.message });
  }
};

exports.updateSiswa = async (req, res) => {
  try {
    const [updated] = await Siswa.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedSiswa = await Siswa.findByPk(req.params.id);
      res.json(updatedSiswa);
    } else {
      res.status(404).json({ message: "Siswa tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Gagal memperbarui siswa", error: error.message });
  }
};

exports.deleteSiswa = async (req, res) => {
  try {
    const deleted = await Siswa.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Siswa berhasil dihapus" });
    } else {
      res.status(404).json({ message: "Siswa tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus siswa", error: error.message });
  }
};
