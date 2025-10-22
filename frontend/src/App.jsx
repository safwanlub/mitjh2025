import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./context/AuthContext.jsx"; // <--- PAKAI HOOK INI

function App() {
  const { user } = useAuth(); // <--- DAPATKAN USER DARI CONTEXT
  console.log("App component dirender. User saat ini:", user);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
