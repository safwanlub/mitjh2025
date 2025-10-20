const { User } = require("../models");
const jwt = require("jsonwebtoken");

// Daftar user (hanya untuk testing, nanti bisa dihapus)
exports.register = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;
    const newUser = await User.create({ nama, email, password, role });
    res
      .status(201)
      .json({
        message: "User berhasil didaftarkan",
        user: { id: newUser.id, nama: newUser.nama, email: newUser.email },
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mendaftarkan user", error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Bandingkan password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Jika cocok, buat token
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "rahasia_kita", {
      expiresIn: "1d",
    });

    res.json({ message: "Login berhasil", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat login", error: error.message });
  }
};
