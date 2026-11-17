/**
 * AppNavigator.js
 * Primary Navigation Architecture for LabMaster.
 * Uses React Navigation v7:
 * - BottomTabNavigator for primary app tabs (Home, Activities, Settings)
 * - NativeStackNavigator for detail and modal screens (ActivityDetails, About)
 * - Fully synchronized with dynamic ThemeContext
 */

import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../hooks/useTheme';

// Import Screens
import { HomeScreen } from '../screens/HomeScreen';
import { ActivitiesScreen } from '../screens/ActivitiesScreen';
import { ActivityDetailsScreen } from '../screens/ActivityDetailsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { AboutScreen } from '../screens/AboutScreen';

// Import Custom Reusable Bottom Navigation Bar
import { BottomNavigation } from '../components/BottomNavigation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNavigation {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{ title: 'Activities' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

// Root Application Navigator
export function AppNavigator() {
  const { theme, isDarkMode } = useTheme();

  const navigationTheme = {
    dark: isDarkMode,
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.textPrimary,
      border: theme.colors.border,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Main Tab Shell */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />

        {/* Modal / Detail Screens */}
        <Stack.Screen
          name="ActivityDetails"
          component={ActivityDetailsScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
