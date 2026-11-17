/**
 * AboutScreen.js
 * Application Information and Developer Profile Screen.
 * Features:
 * - Application branding and logo
 * - Purpose and technical specifications
 * - Technologies and architectural patterns used
 * - Student developer credentials
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { CustomHeader } from '../components/CustomHeader';

export const AboutScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const technologies = [
    { name: 'React Native', desc: 'Mobile UI rendering engine' },
    { name: 'Expo SDK 58', desc: 'Cross-platform mobile toolchain' },
    { name: 'React Navigation v7', desc: 'Native Stack & Bottom Tabs' },
    { name: 'React Context API', desc: 'Global theme & state management' },
    { name: 'AsyncStorage', desc: 'Local persistent preference storage' },
    { name: 'Flexbox Layouts', desc: 'Adaptive cross-device responsiveness' },
  ];

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: theme.colors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      <CustomHeader
        title="About LabMaster"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[
            styles.heroCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={[styles.appLogo, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="school" size={40} color="#FFFFFF" />
          </View>
          <Text style={[styles.appName, { color: theme.colors.textPrimary }]}>
            LabMaster
          </Text>
          <Text style={[styles.appVersion, { color: theme.colors.primary }]}>
            Version 1.0.0 (Release Build)
          </Text>
          <Text style={[styles.appTagline, { color: theme.colors.textSecondary }]}>
            Educational Laboratory Compilation Mobile Application
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="sparkles-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.sectionHeading, { color: theme.colors.textPrimary }]}>
              Project Purpose
            </Text>
          </View>
          <Text style={[styles.bodyText, { color: theme.colors.textSecondary }]}>
            LabMaster is an educational mobile compilation application developed as the culminating hands-on requirement for React Native mobile application development.
          </Text>
          <Text style={[styles.bodyText, { color: theme.colors.textSecondary, marginTop: 8 }]}>
            It demonstrates component-based architecture, multi-screen navigation, global state sharing via React Context API, responsive Flexbox design, and persistent theme customization.
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="hardware-chip-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.sectionHeading, { color: theme.colors.textPrimary }]}>
              Core Technologies
            </Text>
          </View>

          {technologies.map((tech, idx) => (
            <View key={idx} style={styles.techItem}>
              <View style={[styles.techDot, { backgroundColor: theme.colors.primary }]} />
              <View style={styles.techTextCol}>
                <Text style={[styles.techName, { color: theme.colors.textPrimary }]}>
                  {tech.name}
                </Text>
                <Text style={[styles.techDesc, { color: theme.colors.textSecondary }]}>
                  {tech.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="person-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.sectionHeading, { color: theme.colors.textPrimary }]}>
              Developer & Academic Info
            </Text>
          </View>

          <View style={styles.devRow}>
            <Text style={[styles.devLabel, { color: theme.colors.textMuted }]}>Developer:</Text>
            <Text style={[styles.devValue, { color: theme.colors.textPrimary }]}>
              Kaiser Octobre
            </Text>
          </View>

          <View style={styles.devRow}>
            <Text style={[styles.devLabel, { color: theme.colors.textMuted }]}>Course:</Text>
            <Text style={[styles.devValue, { color: theme.colors.textPrimary }]}>
              Mobile Application Development
            </Text>
          </View>

          <View style={styles.devRow}>
            <Text style={[styles.devLabel, { color: theme.colors.textMuted }]}>Target Platform:</Text>
            <Text style={[styles.devValue, { color: theme.colors.textPrimary }]}>
              Android (Expo / React Native)
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  heroCard: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  appLogo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
  },
  appVersion: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 6,
  },
  appTagline: {
    fontSize: 13,
    textAlign: 'center',
  },
  card: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 19,
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  techDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 10,
  },
  techTextCol: {
    flex: 1,
  },
  techName: {
    fontSize: 13,
    fontWeight: '700',
  },
  techDesc: {
    fontSize: 12,
    marginTop: 1,
  },
  devRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(100, 116, 139, 0.15)',
  },
  devLabel: {
    fontSize: 13,
  },
  devValue: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default AboutScreen;
