import { createContext, useContext, useState, useEffect } from 'react';
import { themes } from '../config/themes';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage first
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    // If no saved preference, check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [themeIndex, setThemeIndex] = useState(() => {
    const saved = localStorage.getItem('themeIndex');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    // Update local storage when theme changes
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    // Update document class
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('themeIndex', themeIndex);
  }, [themeIndex]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const setTheme = (idx) => setThemeIndex(idx);
  const currentTheme = themes[themeIndex];

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, themeIndex, setTheme, currentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
