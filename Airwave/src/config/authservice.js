// services/AuthService.js

import axiosInstance from './axios';

const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('login/', { email, password });

    if (response.data.access && response.data.refresh) {
      // Store access and refresh tokens, and session ID in local storage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('session_id', response.data.session_id);
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const logout = async () => {
  try {
    const refresh_token = localStorage.getItem('refresh_token');
    
    if (refresh_token) {
      await axiosInstance.post('/logout/', { refresh_token });
    }

    // Clear tokens and session data
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('session_id');
    
    window.location.href = '/login'; // Redirect to login page
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export default { login, logout };
