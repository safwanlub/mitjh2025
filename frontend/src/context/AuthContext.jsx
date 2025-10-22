import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("AuthProvider: useEffect dijalankan");
    const currentUser = authService.getCurrentUser();
    console.log("User dari localStorage:", currentUser);
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = (userData) => {
    console.log("AuthProvider: login dipanggil dengan data:", userData);
    setUser(userData);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Ubah cara export hook-nya
export const useAuth = () => {
  // <--- KEMBALIKAN KE INI
  return useContext(AuthContext);
};

// export default useAuth; // <--- GANTI MENJADI DEFAULT EXPORT
