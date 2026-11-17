/**
 * SearchBar.js
 * Reusable search bar input for filtering laboratory activities.
 * Provides clear button, search icon, and smooth focus states.
 */

import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export const SearchBar = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search activities by title...',
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.md,
        },
        style,
      ]}
    >
      <Ionicons
        name="search-outline"
        size={20}
        color={theme.colors.textMuted}
        style={styles.searchIcon}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        style={[
          styles.input,
          {
            color: theme.colors.textPrimary,
          },
        ]}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {value && value.length > 0 && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onClear || (() => onChangeText(''))}
          style={styles.clearButton}
        >
          <Ionicons
            name="close-circle"
            size={18}
            color={theme.colors.textMuted}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: '100%',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;
