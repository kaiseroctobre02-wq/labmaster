/**
 * ThemeToggle.js
 * Reusable Dark and Light Mode toggle control.
 * Interacts directly with global ThemeContext to switch theme application-wide.
 */

import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle = ({ showLabel = true, style }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleTheme}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.lg,
        },
        style,
      ]}
    >
      <View style={styles.leftRow}>
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor: isDarkMode
                ? 'rgba(96, 165, 250, 0.15)'
                : 'rgba(245, 158, 11, 0.15)',
            },
          ]}
        >
          <Ionicons
            name={isDarkMode ? 'moon' : 'sunny'}
            size={20}
            color={isDarkMode ? theme.colors.primary : '#F59E0B'}
          />
        </View>

        {showLabel && (
          <View style={styles.textColumn}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              {isDarkMode ? 'High contrast slate theme' : 'Bright and clean daylight theme'}
            </Text>
          </View>
        )}
      </View>

      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{
          false: '#CBD5E1',
          true: theme.colors.primary,
        }}
        thumbColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textColumn: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default ThemeToggle;
