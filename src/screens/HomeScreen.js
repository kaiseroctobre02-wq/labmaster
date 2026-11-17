/**
 * HomeScreen.js
 * Home Dashboard - The central navigation hub of LabMaster.
 * Features:
 * - Application Header with logo, user avatar, and quick actions
 * - Welcome greeting section
 * - Dynamic Statistics Cards (Total, Completed, In Progress, Upcoming)
 * - Quick Access navigation buttons
 * - Recent Activities section rendered using reusable ActivityCard
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { activitiesData } from '../data/activities';
import { StatCard } from '../components/StatCard';
import { ActivityCard } from '../components/ActivityCard';
import { CustomButton } from '../components/CustomButton';

export const HomeScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();

  // Dynamic statistics calculation based on actual activity data
  const stats = useMemo(() => {
    const total = activitiesData.length;
    const completed = activitiesData.filter((a) => a.status === 'Completed').length;
    const inProgress = activitiesData.filter((a) => a.status === 'In Progress').length;
    const notStarted = activitiesData.filter((a) => a.status === 'Not Started').length;
    return { total, completed, inProgress, notStarted };
  }, []);

  // Filter recent activities (last 3 items)
  const recentActivities = useMemo(() => {
    return activitiesData.slice(0, 3);
  }, []);

  return (
    <View
      style={[
        styles.screenContainer,
        {
          backgroundColor: theme.colors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.surface}
      />

      {/* Top Application Header */}
      <View
        style={[
          styles.headerBar,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <View style={styles.brandRow}>
          <View style={[styles.logoIconBadge, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="school" size={20} color="#FFFFFF" />
          </View>
          <View>
            <Text style={[styles.appName, { color: theme.colors.textPrimary }]}>
              LabMaster
            </Text>
            <Text style={[styles.appTagline, { color: theme.colors.textSecondary }]}>
              React Native Lab Hub
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Settings')}
          style={[styles.avatarButton, { backgroundColor: theme.colors.primaryLight }]}
        >
          <Text style={[styles.avatarText, { color: theme.colors.primary }]}>KO</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Section */}
        <View
          style={[
            styles.welcomeBanner,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={styles.welcomeLeft}>
            <Text style={[styles.welcomeGreeting, { color: theme.colors.textSecondary }]}>
              Welcome back,
            </Text>
            <Text style={[styles.studentName, { color: theme.colors.textPrimary }]}>
              Kaiser Octobre 👋
            </Text>
            <Text style={[styles.welcomeSubtitle, { color: theme.colors.textSecondary }]}>
              Manage, review, and master your mobile laboratory exercises in one place.
            </Text>
          </View>
          <View style={[styles.welcomeGraphic, { backgroundColor: theme.colors.primaryLight }]}>
            <Ionicons name="terminal-outline" size={28} color={theme.colors.primary} />
          </View>
        </View>

        {/* Statistics Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            Activity Overview
          </Text>
          <Text style={[styles.sectionBadge, { color: theme.colors.primary }]}>
            {stats.completed}/{stats.total} Finished
          </Text>
        </View>

        {/* 2x2 Responsive Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statColumn}>
            <StatCard
              icon="library-outline"
              count={stats.total}
              label="Total Labs"
              accentColor={theme.colors.primary}
              style={styles.statCardMargin}
            />
          </View>
          <View style={styles.statColumn}>
            <StatCard
              icon="checkmark-circle-outline"
              count={stats.completed}
              label="Completed"
              accentColor={theme.colors.success}
              backgroundColor={theme.colors.successLight}
              style={styles.statCardMargin}
            />
          </View>
          <View style={styles.statColumn}>
            <StatCard
              icon="time-outline"
              count={stats.inProgress}
              label="In Progress"
              accentColor={theme.colors.warning}
              backgroundColor={theme.colors.warningLight}
              style={styles.statCardMargin}
            />
          </View>
          <View style={styles.statColumn}>
            <StatCard
              icon="hourglass-outline"
              count={stats.notStarted}
              label="Upcoming"
              accentColor={theme.colors.info}
              backgroundColor={theme.colors.infoLight}
              style={styles.statCardMargin}
            />
          </View>
        </View>

        {/* Quick Access Shortcuts */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            Quick Actions
          </Text>
        </View>

        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Activities')}
            style={[
              styles.actionTile,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={[styles.actionIconBox, { backgroundColor: theme.colors.primaryLight }]}>
              <Ionicons name="list" size={20} color={theme.colors.primary} />
            </View>
            <Text style={[styles.actionLabel, { color: theme.colors.textPrimary }]}>
              All Labs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Settings')}
            style={[
              styles.actionTile,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={[styles.actionIconBox, { backgroundColor: theme.colors.warningLight }]}>
              <Ionicons name="color-palette" size={20} color={theme.colors.warning} />
            </View>
            <Text style={[styles.actionLabel, { color: theme.colors.textPrimary }]}>
              Theme
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.navigate('About')}
            style={[
              styles.actionTile,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={[styles.actionIconBox, { backgroundColor: theme.colors.infoLight }]}>
              <Ionicons name="information-circle" size={20} color={theme.colors.info} />
            </View>
            <Text style={[styles.actionLabel, { color: theme.colors.textPrimary }]}>
              About App
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activities Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            Recent Activities
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Activities')}
          >
            <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>
              View All ({activitiesData.length})
            </Text>
          </TouchableOpacity>
        </View>

        {recentActivities.length > 0 ? (
          recentActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onPress={() => navigation.navigate('ActivityDetails', { activity })}
            />
          ))
        ) : (
          <View
            style={[
              styles.emptyRecentCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Ionicons
              name="folder-open-outline"
              size={36}
              color={theme.colors.textMuted}
              style={{ marginBottom: 8 }}
            />
            <Text style={[styles.emptyRecentTitle, { color: theme.colors.textPrimary }]}>
              No Activities Compiled Yet
            </Text>
            <Text style={[styles.emptyRecentDesc, { color: theme.colors.textSecondary }]}>
              Your master compilation platform is ready. Future laboratory activities can be added to your dataset.
            </Text>
          </View>
        )}

        <CustomButton
          label="Go to Activities Directory"
          icon="arrow-forward"
          iconPosition="right"
          variant="outline"
          onPress={() => navigation.navigate('Activities')}
          style={styles.exploreAllBtn}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  appTagline: {
    fontSize: 11,
    fontWeight: '500',
  },
  avatarButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  welcomeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  welcomeLeft: {
    flex: 1,
    marginRight: 12,
  },
  welcomeGreeting: {
    fontSize: 13,
    fontWeight: '500',
  },
  studentName: {
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 2,
  },
  welcomeSubtitle: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  welcomeGraphic: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  sectionBadge: {
    fontSize: 12,
    fontWeight: '600',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statColumn: {
    width: '48.5%',
  },
  statCardMargin: {
    marginBottom: 12,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  actionTile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  actionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyRecentCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  emptyRecentTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  emptyRecentDesc: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 280,
  },
  exploreAllBtn: {
    marginTop: 12,
    marginBottom: 16,
  },
});

export default HomeScreen;
