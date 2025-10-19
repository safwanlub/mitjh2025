const { body, validationResult } = require("express-validator");

// Middleware untuk menangani hasil validasi
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Kita ubah format response-nya agar lebih konsisten
    return res.status(400).json({
      message: "Validasi gagal",
      errors: errors.array(),
    });
  }
  next();
};

// Aturan validasi untuk Siswa
const validateSiswa = [
  body("nis").notEmpty().withMessage("NIS tidak boleh kosong."),
  body("nama").notEmpty().withMessage("Nama tidak boleh kosong."),
  body("alamat").notEmpty().withMessage("Alamat tidak boleh kosong."),
  body("tanggal_lahir")
    .isISO8601()
    .withMessage("Format tanggal lahir tidak valid."),
  body("KelasId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("KelasId harus angka."),
  handleValidationErrors,
];

// Aturan validasi untuk Kelas (versi sederhana)
const validateKelas = [
  body("nama_kelas").notEmpty().withMessage("Nama kelas tidak boleh kosong."),
  // Validasi unik kita hapus dulu
  handleValidationErrors,
];

const validateMapel = [
  body("nama_mapel")
    .notEmpty()
    .withMessage("Nama mata pelajaran tidak boleh kosong."),
  body("guru").notEmpty().withMessage("Nama guru tidak boleh kosong."),
  handleValidationErrors,
];

module.exports = {
  validateSiswa,
  validateKelas,
  validateMapel,
};
