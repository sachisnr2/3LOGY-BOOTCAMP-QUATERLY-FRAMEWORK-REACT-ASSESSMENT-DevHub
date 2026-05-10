import { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = !!user.id;

  // Restore session on app load
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = authService.getToken();
        if (token) {
          const userData = await authService.getProfile();
          setUser(userData);
        }
      } catch (err) {
        console.error("Session restore failed:", err);
        authService.logout();
        setUser({});
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const userData = await authService.login(email, password);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  const register = async (userName, email, password) => {
    try {
      setError(null);
      const data = await authService.register(userName, email, password);
      return data;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser({});
  };

  const value = {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext