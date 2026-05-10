import api from './api';

const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    const { token } = response.data;
    
    if (token) {
      localStorage.setItem('token', token);
    }
    
    console.log("Login successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("=== LOGIN ERROR ===");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    throw error.response?.data || { message: "Login failed" };
  }
};

const register = async (userName, email, password) => {
  try {
    const response = await api.post('/api/auth/register', { 
      userName, 
      email, 
      password 
    });
    
    console.log("Registration successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("=== REGISTRATION ERROR ===");
    console.error("Status:", error.response?.status);
    console.error("Error Data:", error.response?.data);
    console.error("Full Error:", error);
    
    throw error.response?.data || { message: "Registration failed" };
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

const getToken = () => {
  return localStorage.getItem('token');
};

const getProfile = async () => {
  try {
    const response = await api.get('/api/profile');
    return response.data;
  } catch (error) {
    console.error("Profile fetch error:", error.response?.data);
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};

export default {
  login,
  register,
  logout,
  getToken,
  getProfile,
};
