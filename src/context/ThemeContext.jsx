import React, { createContext, useState, useEffect } from 'react';
import { THEMES } from '../utils/constants'; // Assuming you created this file

// 1. Create the context
export const ThemeContext = createContext();

// 2. Create the provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('luxe-theme') || 'dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('luxe-theme', theme);
    
    // Add smooth transition to body before changing background
    document.body.style.transition = 'background-color 0.3s ease';
    document.body.style.backgroundColor = THEMES[theme].bg;
    
    // Add theme class to body for CSS targeting
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    
    // Set CSS custom properties for theme colors
    const root = document.documentElement;
    root.style.setProperty('--accent-color', THEMES[theme].accent);
    root.style.setProperty('--accent-hover', THEMES[theme].accentHover);
    root.style.setProperty('--accent-light', THEMES[theme].accentLight);
    
    // Clean up transition after it completes to avoid interfering with other styles
    const timeoutId = setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
    t: THEMES[theme],
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};