import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <--- PAKAI HOOK INI

function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  console.log("DashboardPage dirender. User saat ini:", user); // <--- TAMBAHKAN INI

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Selamat Datang di Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
      <div style={styles.content}>
        {user ? (
          <p>
            Halo, <strong>{user.nama}</strong>! Anda login sebagai{" "}
            <strong>{user.role}</strong>.
          </p>
        ) : (
          <p>Loading...</p>
        )}
        <div style={styles.menuContainer}>
          <h3>Menu</h3>
          <ul style={styles.menuList}>
            <li>
              <a href="/siswa">Manajemen Siswa</a>
            </li>
            <li>
              <a href="/kelas">Manajemen Kelas</a>
            </li>
            <li>
              <a href="/mapel">Manajemen Mapel</a>
            </li>
            <li>
              <a href="/nilai">Manajemen Nilai</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  logoutButton: {
    padding: "8px 12px",
    cursor: "pointer",
  },
  content: {
    marginTop: "20px",
  },
  menuContainer: {
    marginTop: "20px",
  },
  menuList: {
    listStyle: "none",
    padding: 0,
  },
};

export default DashboardPage;
