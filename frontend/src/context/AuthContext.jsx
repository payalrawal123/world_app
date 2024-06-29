import axios from 'axios';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', credentials);
      const token = response.data.token;
      localStorage.setItem('token', token);
      const decoded = parseJwt(token); // Decoding JWT token directly
      setUser(decoded);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      // Handle error as needed (e.g., show error message)
    }
  };

  const register = async (credentials) => {
    try {
      await axios.post('http://localhost:8080/auth/register', credentials);
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error as needed (e.g., show error message)
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Function to decode JWT token manually
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1])); // Decode base64 payload
    } catch (e) {
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
