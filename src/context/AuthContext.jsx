
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const API_URL = "http://localhost:5000/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/me`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth Check Error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Login failed");
    }

    await checkAuth();
    return data;
  };

  const logout = async () => {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Logout failed");
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
