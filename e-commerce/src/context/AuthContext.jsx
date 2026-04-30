import { createContext, useContext, useEffect, useState } from "react";
import {
  getProfile,
  register as registerService,
  login as loginService,
  logout as logoutService,
} from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfile()
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const clearError = () => setError(null);

  const register = async (name, email, password) => {
    try {
      await registerService(name, email, password);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Register gagal");
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const data = await loginService(email, password);
      setUser(data.user);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (err) {
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        clearError,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
