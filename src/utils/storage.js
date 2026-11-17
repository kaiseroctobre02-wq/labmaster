/**
 * Storage Utility
 * Encapsulates AsyncStorage operations for local persistence,
 * including user theme preferences and session data.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@labmaster_theme_mode';

/**
 * Save user theme preference (true for dark mode, false for light mode)
 * @param {boolean} isDark
 */
export const saveThemePreference = async (isDark) => {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDark));
  } catch (error) {
    console.error('Failed to save theme preference to AsyncStorage:', error);
  }
};

/**
 * Retrieve saved theme preference
 * @returns {Promise<boolean|null>} Returns boolean if stored, null if none
 */
export const getThemePreference = async () => {
  try {
    const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    return saved !== null ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to read theme preference from AsyncStorage:', error);
    return null;
  }
};
