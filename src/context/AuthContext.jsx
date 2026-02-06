import { createContext,  useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user || res.data);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };



  const signup = async (credentials) => {
    try {
      const res = await api.post("/auth/signup", credentials);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setUser(res.data.user);
      return res;
    } catch (err) {
      throw err;
    }
  };


  const login = async (credentials) => {
    try {
      const res = await api.post("/auth/login", credentials);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setUser(res.data.user);
      return res;
    } catch (err) {
      throw err;
    }
  };

 

  const logout = async () => {
    try {
      await api.delete("/auth/logout");
    } catch (err) {
      
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  
  useEffect(() => {
    fetchUser();
  }, []);



  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signup,
        login,
        logout,
        loading,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

