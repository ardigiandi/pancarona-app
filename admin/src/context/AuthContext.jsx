// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // cek login saat pertama load
  useEffect(() => {
    const fetchUser = async () => {
      const res = await authService.getMe();
      setAdmin(res?.admin || null);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogin = async (form) => {
    const res = await authService.login(form);
    setAdmin(res.admin); // langsung set tanpa reload
  };

  const handleLogout = async () => {
    await authService.logout();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login: handleLogin,
        logout: handleLogout,
        isAuth: !!admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);