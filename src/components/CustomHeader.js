/**
 * CustomHeader.js
 * Reusable header for screens with:
 * - Back button support (for stack screens like ActivityDetails, About)
 * - Screen title & optional subtitle
 * - Right-side action slot (e.g. quick theme toggle or profile avatar)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export const CustomHeader = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightAction,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
        },
        style,
      ]}
    >
      <View style={styles.leftRow}>
        {showBack && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBackPress}
            style={[styles.backButton, { backgroundColor: theme.colors.surfaceVariant }]}
          >
            <Ionicons name="arrow-back" size={20} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text
            style={[styles.title, { color: theme.colors.textPrimary }]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[styles.subtitle, { color: theme.colors.textSecondary }]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {rightAction && <View style={styles.rightContainer}>{rightAction}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  rightContainer: {
    marginLeft: 12,
  },
});

export default CustomHeader;
