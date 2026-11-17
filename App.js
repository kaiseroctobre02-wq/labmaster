/**
 * App.js
 * Root Entry Point of the LabMaster Mobile Application.
 * Configures:
 * - ThemeProvider (Global State via React Context API)
 * - SafeAreaProvider (Safe insets for Android notches & status bars)
 * - Theme-aware StatusBar
 * - AppNavigator (React Navigation root)
 */

import React from 'react';
import { StatusBar, View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { useTheme } from './src/hooks/useTheme';
import { AppNavigator } from './src/navigation/AppNavigator';

// Inner wrapper component that has access to ThemeContext
function RootApp() {
  const { theme, isDarkMode, isLoadingTheme } = useTheme();

  if (isLoadingTheme) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.surface}
        translucent={false}
      />
      <AppNavigator />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootApp />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
