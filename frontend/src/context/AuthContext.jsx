import { createContext, useEffect, useState } from "react";
import { api } from "../api/axios.api";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const { data } = await api.get("/api/auth/check");
      if (data.success) {
        setUser(data.user);
      }
    } catch (err) {
      // Not logged in
    } finally {
      setLoading(false);
    }
  };

  const login = async (state, credentials) => {
    try {
      const res = await api.post(`/api/auth/${state}`, credentials);
      const data = res.data;
      if (data.success) {
        setUser(data.user);
        if (data.user.role === "admin") {
          toast.success("Admin logged in");
        } else toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const logout = async () => {
    try {
      const { data } = await api.post(`/api/auth/logout`);
      if (data.success) {
        setUser(null);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (!user) getUser();
  }, []);

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

