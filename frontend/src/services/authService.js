import axios from "axios";

// Buat instance axios dengan baseURL ke backend kita
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Sesuaikan dengan port backend
});

// Fungsi untuk login
const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    // --- PERUBAHAN DIMULAI DI SINI ---
    // Decode token untuk mendapatkan data user
    const token = response.data.token;
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload

    // Buat object user yang lebih bersih
    const userToStore = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      token: token, // Simpan token juga untuk keperluan API call
    };

    // Simpan yang sudah dibersihkan ke localStorage
    localStorage.setItem("user", JSON.stringify(userToStore));
    // --- PERUBAHAN SELESAI DI SINI ---

    return response.data;
  } catch (error) {
    // Lempar error agar bisa ditangkap di komponen
    throw error.response.data;
  }
};

// Fungsi untuk logout
const logout = () => {
  localStorage.removeItem("user");
};

// Fungsi untuk mendapatkan user yang sedang login
const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  console.log("Isi localStorage (userStr):", userStr); // <--- TAMBAHKAN INI
  const user = JSON.parse(userStr);
  console.log("Hasil parse (user):", user); // <--- DAN INI
  return user;
};

// Export semua fungsinya
export const authService = {
  login,
  logout,
  getCurrentUser,
};
