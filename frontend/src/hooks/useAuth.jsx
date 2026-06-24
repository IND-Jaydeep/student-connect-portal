import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) return null;
    
    try {
      // Decode JWT payload (very basic decode for name/role if they are in the token)
      // Usually, Spring Boot might return the user details in the login response or we fetch /api/users/me
      // For now, we will rely on what was stored in local storage during login or token decoding
      const role = localStorage.getItem('userRole') || null;
      const name = localStorage.getItem('userName') || '';
      return role ? { role, name, token } : null;
    } catch (e) {
      return null;
    }
  });

  const login = async (email, password, role) => {
    try {
      const response = await api.post('/auth/login', { email, password, role });
      if (response && response.token) {
        localStorage.setItem('jwt_token', response.token);
        localStorage.setItem('userRole', response.role || role);
        localStorage.setItem('userName', response.name || email.split('@')[0]);
        setUser({ role: response.role || role, name: response.name || email.split('@')[0], token: response.token });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      if (response && response.token) {
        localStorage.setItem('jwt_token', response.token);
        localStorage.setItem('userRole', response.role || userData.role);
        localStorage.setItem('userName', response.name || userData.name);
        setUser({ role: response.role || userData.role, name: response.name || userData.name, token: response.token });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  }

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setUser(null);
  };

  const updateProfile = (field, value) => {
    if (user) {
      localStorage.setItem(`${user.role}_${field}`, value);
    }
  };

  const getProfileField = (field, fallback = '') => {
    if (user) {
      return localStorage.getItem(`${user.role}_${field}`) || fallback;
    }
    return fallback;
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, getProfileField }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

