/**
 * SettingsScreen.js
 * Application Preferences and Profile Screen.
 * Features:
 * - Student profile summary (Avatar, Name, Program)
 * - Appearance Settings with ThemeToggle (instant app-wide Dark/Light switch)
 * - Laboratory compilation preferences
 * - Navigation link to AboutScreen
 * - Version & build information
 */

import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../hooks/useTheme';

export const SettingsScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();

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
      {/* Screen Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: theme.colors.textPrimary }]}>
          Settings & Preferences
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Manage theme, profile, and application details
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Student Profile Card */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={[styles.avatarLarge, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.avatarLargeText}>KO</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.colors.textPrimary }]}>
              Kaiser Octobre
            </Text>
            <Text style={[styles.profileDegree, { color: theme.colors.primary }]}>
              BS Computer Science
            </Text>
            <Text style={[styles.profileRole, { color: theme.colors.textSecondary }]}>
              React Native Mobile Developer
            </Text>
          </View>
        </View>

        {/* Section: Appearance */}
        <Text style={[styles.sectionHeading, { color: theme.colors.textSecondary }]}>
          APPEARANCE & THEME
        </Text>

        <ThemeToggle style={styles.themeToggleCard} />

        <View
          style={[
            styles.infoBox,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Ionicons
            name="color-wand-outline"
            size={18}
            color={theme.colors.primary}
            style={styles.infoIcon}
          />
          <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
            Theme mode changes are applied across all screens immediately via React Context API and stored locally with AsyncStorage.
          </Text>
        </View>

        {/* Section: General Application */}
        <Text style={[styles.sectionHeading, { color: theme.colors.textSecondary }]}>
          APPLICATION INFO
        </Text>

        <View
          style={[
            styles.menuGroup,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('About')}
            style={[styles.menuItem, { borderBottomColor: theme.colors.borderLight }]}
          >
            <View style={styles.menuItemLeft}>
              <View
                style={[
                  styles.menuIconBox,
                  { backgroundColor: theme.colors.primaryLight },
                ]}
              >
                <Ionicons
                  name="information-circle"
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <View>
                <Text style={[styles.menuItemTitle, { color: theme.colors.textPrimary }]}>
                  About LabMaster
                </Text>
                <Text style={[styles.menuItemSubtitle, { color: theme.colors.textSecondary }]}>
                  App purpose, architecture, and developer info
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={theme.colors.textMuted}
            />
          </TouchableOpacity>

          <View style={[styles.menuItem, { borderBottomColor: theme.colors.borderLight }]}>
            <View style={styles.menuItemLeft}>
              <View
                style={[
                  styles.menuIconBox,
                  { backgroundColor: theme.colors.surfaceVariant },
                ]}
              >
                <Ionicons
                  name="git-branch-outline"
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </View>
              <View>
                <Text style={[styles.menuItemTitle, { color: theme.colors.textPrimary }]}>
                  App Version
                </Text>
                <Text style={[styles.menuItemSubtitle, { color: theme.colors.textSecondary }]}>
                  v1.0.0 (Expo SDK 58 / React Native 0.88)
                </Text>
              </View>
            </View>
            <View style={[styles.versionPill, { backgroundColor: theme.colors.surfaceVariant }]}>
              <Text style={[styles.versionPillText, { color: theme.colors.textSecondary }]}>
                Production Ready
              </Text>
            </View>
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View
                style={[
                  styles.menuIconBox,
                  { backgroundColor: theme.colors.successLight },
                ]}
              >
                <Ionicons
                  name="shield-checkmark"
                  size={20}
                  color={theme.colors.success}
                />
              </View>
              <View>
                <Text style={[styles.menuItemTitle, { color: theme.colors.textPrimary }]}>
                  Academic Compilation
                </Text>
                <Text style={[styles.menuItemSubtitle, { color: theme.colors.textSecondary }]}>
                  Mobile Application Development Hands-on
                </Text>
              </View>
            </View>
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarLargeText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
  },
  profileDegree: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  profileRole: {
    fontSize: 12,
    marginTop: 2,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginLeft: 4,
  },
  themeToggleCard: {
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 17,
    flex: 1,
  },
  menuGroup: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuItemTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  menuItemSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  versionPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  versionPillText: {
    fontSize: 11,
    fontWeight: '600',
  },
});

export default SettingsScreen;
