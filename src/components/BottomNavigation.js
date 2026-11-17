/**
 * BottomNavigation.js
 * Reusable bottom navigation bar component.
 * Can be used as a custom tab bar renderer for React Navigation
 * or as a standalone navigational control.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';

export const BottomNavigation = ({ state, descriptors, navigation }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const getIconName = (routeName, isFocused) => {
    switch (routeName) {
      case 'Home':
        return isFocused ? 'home' : 'home-outline';
      case 'Activities':
        return isFocused ? 'book' : 'book-outline';
      case 'Settings':
        return isFocused ? 'settings' : 'settings-outline';
      default:
        return 'ellipse-outline';
    }
  };

  return (
    <View
      style={[
        styles.navContainer,
        {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const activeColor = theme.colors.primary;
        const inactiveColor = theme.colors.textMuted;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconBubble,
                isFocused && {
                  backgroundColor: theme.isDark
                    ? 'rgba(96, 165, 250, 0.15)'
                    : 'rgba(37, 99, 235, 0.1)',
                },
              ]}
            >
              <Ionicons
                name={getIconName(route.name, isFocused)}
                size={22}
                color={isFocused ? activeColor : inactiveColor}
              />
            </View>
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isFocused ? activeColor : inactiveColor,
                  fontWeight: isFocused ? '700' : '500',
                },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBubble: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 3,
  },
  tabLabel: {
    fontSize: 11,
  },
});

export default BottomNavigation;
