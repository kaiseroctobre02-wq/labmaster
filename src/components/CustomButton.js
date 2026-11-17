/**
 * CustomButton.js
 * Reusable button component supporting multiple variants:
 * 'primary', 'secondary', 'outline', and 'ghost'.
 * Adapts to theme colors and supports custom icons and disabled states.
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export const CustomButton = ({
  label,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'medium',    // 'small' | 'medium' | 'large'
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  let backgroundColor = theme.colors.primary;
  let textColor = '#FFFFFF';
  let borderColor = 'transparent';
  let borderWidth = 0;

  if (variant === 'secondary') {
    backgroundColor = theme.colors.surfaceVariant;
    textColor = theme.colors.textPrimary;
  } else if (variant === 'outline') {
    backgroundColor = 'transparent';
    textColor = theme.colors.primary;
    borderColor = theme.colors.border;
    borderWidth = 1.5;
  } else if (variant === 'ghost') {
    backgroundColor = 'transparent';
    textColor = theme.colors.primary;
  }

  let paddingVertical = 12;
  let paddingHorizontal = 18;
  let fontSize = 15;

  if (size === 'small') {
    paddingVertical = 8;
    paddingHorizontal = 12;
    fontSize = 13;
  } else if (size === 'large') {
    paddingVertical = 15;
    paddingHorizontal = 24;
    fontSize = 16;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? (theme.isDark ? '#334155' : '#E2E8F0') : backgroundColor,
          borderColor,
          borderWidth,
          paddingVertical,
          paddingHorizontal,
          borderRadius: theme.borderRadius.md,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={fontSize + 2}
              color={disabled ? theme.colors.textMuted : textColor}
              style={styles.leftIcon}
            />
          )}
          <Text
            style={[
              styles.text,
              {
                color: disabled ? theme.colors.textMuted : textColor,
                fontSize,
              },
              textStyle,
            ]}
          >
            {label}
          </Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={fontSize + 2}
              color={disabled ? theme.colors.textMuted : textColor}
              style={styles.rightIcon}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default CustomButton;
