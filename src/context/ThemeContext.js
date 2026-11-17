/**
 * ThemeContext.js
 * Global State Management using React Context API.
 * Provides the current active theme, dark/light state, and toggle function
 * to all child components across the entire mobile application.
 */

import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../styles/theme';
import { getThemePreference, saveThemePreference } from '../utils/storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);

  // Load saved theme preference on initial app launch (Demonstrates useEffect)
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedPreference = await getThemePreference();
        if (savedPreference !== null) {
          setIsDarkMode(savedPreference);
        } else {
          // Default to system preference if no manual setting saved
          setIsDarkMode(systemColorScheme === 'dark');
        }
      } catch (e) {
        console.warn('Could not load theme, defaulting to light mode', e);
      } finally {
        setIsLoadingTheme(false);
      }
    };

    loadSavedTheme();
  }, [systemColorScheme]);

  // Function to toggle between Light and Dark mode
  const toggleTheme = async () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    await saveThemePreference(nextMode);
  };

  // Function to set theme explicitly
  const setThemeMode = async (darkModeEnabled) => {
    setIsDarkMode(darkModeEnabled);
    await saveThemePreference(darkModeEnabled);
  };

  // Determine current active color palette based on global state
  const activeTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{
        theme: activeTheme,
        isDarkMode,
        toggleTheme,
        setThemeMode,
        isLoadingTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
