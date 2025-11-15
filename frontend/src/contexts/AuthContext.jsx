import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Admin credentials from environment variables
  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || "admin";
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "sermonadmin2024";

  useEffect(() => {
    // Check if admin is already logged in from localStorage
    const adminToken = localStorage.getItem("admin_logged_in");
    if (adminToken === "true") {
      setIsAdminLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const loginAsAdmin = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      localStorage.setItem("admin_logged_in", "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("admin_logged_in");
  };

  const value = {
    isAdminLoggedIn,
    loading,
    loginAsAdmin,
    logoutAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};