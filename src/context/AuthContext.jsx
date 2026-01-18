import React, { createContext, useState, useEffect } from 'react';
// import { apiLogin, apiRegister, apiLogout } from '../api/auth'; // For a real app

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // To check initial auth status

  // Check for an existing session on app load
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // In a real app, you'd verify a token with your backend here
        const storedUser = localStorage.getItem('luxe-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const login = async (email, password) => {
    // This would be an API call in a real app
    // const userData = await apiLogin({ email, password });
    console.log('Simulating login for:', email);
    return new Promise(resolve => {
        setTimeout(() => {
            const mockUser = { name: 'John Doe', email: email };
            setUser(mockUser);
            localStorage.setItem('luxe-user', JSON.stringify(mockUser));
            resolve(mockUser);
        }, 1000);
    });
  };

  const register = async (name, email, password) => {
    // const userData = await apiRegister({ name, email, password });
     console.log('Simulating registration for:', email);
    return new Promise(resolve => {
        setTimeout(() => {
            const mockUser = { name: name, email: email };
            setUser(mockUser);
            localStorage.setItem('luxe-user', JSON.stringify(mockUser));
            resolve(mockUser);
        }, 1000);
    });
  };

  const logout = () => {
    // await apiLogout();
    console.log('Logging out.');
    setUser(null);
    localStorage.removeItem('luxe-user');
  };

  const value = {
    user,
    isAuthenticated: !!user, // Simple boolean check if user object exists
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};