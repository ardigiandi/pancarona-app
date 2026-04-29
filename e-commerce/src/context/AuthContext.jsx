import { loginUser, registerUser } from "@/data/users";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [error, setError] = useState(null);

  const login = (email, password) => {
    setError(null);
    const result = loginUser(email, password);

    if (!result.success) {
      setError(result.message);
      return false;
    }

    setUser(result.user);
    localStorage.setItem("auth_user", JSON.stringify(result.user));
    return true;
  };

  const register = (name, email, password) => {
    setError(null);
    const result = registerUser(name, email, password);

    if (!result.success) {
      setError(result.message);
      return false;
    }

    setUser(result.user);
    localStorage.setItem("auth_user", JSON.stringify(result.user));
    return true;
  };

  const logout = () => {
    setError(null);
    localStorage.removeItem("auth_user");
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{ user, error, login, register, logout, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
