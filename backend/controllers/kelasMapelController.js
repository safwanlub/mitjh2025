const { Kelas, Mapel } = require("../models");

// Menambahkan Mapel ke dalam sebuah Kelas
exports.addMapelToKelas = async (req, res) => {
  const { kelasId, mapelId } = req.params;

  try {
    const kelas = await Kelas.findByPk(kelasId);
    if (!kelas) {
      return res.status(404).json({ message: "Kelas tidak ditemukan" });
    }

    const mapel = await Mapel.findByPk(mapelId);
    if (!mapel) {
      return res.status(404).json({ message: "Mapel tidak ditemukan" });
    }

    // Gunakan metode 'add' dari Sequelize untuk relasi belongsToMany
    await kelas.addMapel(mapel);

    res.status(200).json({ message: "Mapel berhasil ditambahkan ke kelas" });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan mapel ke kelas",
      error: error.message,
    });
  }
};

// Menghapus Mapel dari sebuah Kelas
exports.removeMapelFromKelas = async (req, res) => {
  const { kelasId, mapelId } = req.params;

  try {
    const kelas = await Kelas.findByPk(kelasId);
    if (!kelas) {
      return res.status(404).json({ message: "Kelas tidak ditemukan" });
    }

    const mapel = await Mapel.findByPk(mapelId);
    if (!mapel) {
      return res.status(404).json({ message: "Mapel tidak ditemukan" });
    }

    // Gunakan metode 'remove' dari Sequelize
    await kelas.removeMapel(mapel);

    res.status(200).json({ message: "Mapel berhasil dihapus dari kelas" });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus mapel dari kelas",
      error: error.message,
    });
  }
};

// Melihat semua Mapel yang ada di sebuah Kelas
exports.getMapelsInKelas = async (req, res) => {
  const { kelasId } = req.params;

  try {
    const kelas = await Kelas.findByPk(kelasId, {
      include: {
        model: Mapel,
        as: "Mapels",
        through: { attributes: [] }, // Jangan tampilkan atribut dari tabel penghubung (KelasMapel)
      },
    });

    if (!kelas) {
      return res.status(404).json({ message: "Kelas tidak ditemukan" });
    }

    res.status(200).json(kelas.Mapels);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data mapel", error: error.message });
  }
};
