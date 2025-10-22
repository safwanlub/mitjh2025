import React, { useState } from "react";
import { authService } from "../services/authService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.login(email, password);
      // Jika berhasil, redirect ke halaman dashboard (nanti kita buat)
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat login.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Login SIM-Sekolah</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          {error && <p style={styles.errorText}>{error}</p>}
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Biar nggak terlalu panjang, kita pakai style inline dulu ya
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  formContainer: {
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: "400px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    padding: "12px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  errorText: {
    color: "red",
    marginBottom: "15px",
  },
};

export default LoginPage;
