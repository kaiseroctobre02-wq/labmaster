/**
 * StatCard.js
 * Reusable statistics card component used in Dashboard and Summary metrics.
 * Displays an icon badge, numerical metric, and descriptive label.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export const StatCard = ({
  icon,
  count,
  label,
  accentColor,
  backgroundColor,
  style,
}) => {
  const { theme } = useTheme();

  const activeAccent = accentColor || theme.colors.primary;
  const activeBg = backgroundColor || (theme.isDark ? 'rgba(96, 165, 250, 0.12)' : 'rgba(37, 99, 235, 0.08)');

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.lg,
          shadowColor: theme.colors.cardShadow,
        },
        style,
      ]}
    >
      <View style={[styles.iconWrapper, { backgroundColor: activeBg }]}>
        <Ionicons name={icon} size={22} color={activeAccent} />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.count, { color: theme.colors.textPrimary }]}>
          {count}
        </Text>
        <Text
          style={[styles.label, { color: theme.colors.textSecondary }]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  count: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 26,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default StatCard;
