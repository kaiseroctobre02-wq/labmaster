/**
 * ActivityDetailsScreen.js
 * Dynamic details screen for any selected laboratory activity.
 * Receives the activity data object via navigation route parameters.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { CustomHeader } from '../components/CustomHeader';

export const ActivityDetailsScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const { activity } = route.params || {};

  if (!activity) {
    return (
      <View
        style={[
          styles.errorContainer,
          {
            backgroundColor: theme.colors.background,
            paddingTop: insets.top,
          },
        ]}
      >
        <Ionicons name="alert-circle-outline" size={48} color={theme.colors.warning} />
        <Text style={[styles.errorTitle, { color: theme.colors.textPrimary }]}>
          No Activity Selected
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backBtn, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.backBtnText}>Return to Activities</Text>
        </TouchableOpacity>
      </View>
    );
  }

  let statusBg = theme.colors.infoLight;
  let statusTextColor = theme.colors.info;

  if (activity.status === 'Completed') {
    statusBg = theme.colors.successLight;
    statusTextColor = theme.colors.success;
  } else if (activity.status === 'In Progress') {
    statusBg = theme.colors.warningLight;
    statusTextColor = theme.colors.warning;
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `LabMaster: ${activity.title}`,
      });
    } catch (error) {
      console.log('Error sharing activity', error);
    }
  };

  const hasExtraContent =
    (activity.objectives && activity.objectives.length > 0) ||
    (activity.instructions && activity.instructions.length > 0) ||
    Boolean(activity.content) ||
    Boolean(activity.codeSnippet);

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
        title={activity.title || `Activity ${activity.activityNumber}`}
        subtitle={activity.category || undefined}
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity
            onPress={handleShare}
            style={[styles.headerActionBtn, { backgroundColor: theme.colors.surfaceVariant }]}
          >
            <Ionicons name="share-social-outline" size={18} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={styles.badgeRow}>
            <View style={[styles.numberPill, { backgroundColor: theme.colors.primaryLight }]}>
              <Text style={[styles.numberPillText, { color: theme.colors.primary }]}>
                Activity {activity.activityNumber}
              </Text>
            </View>

            <View style={[styles.statusPill, { backgroundColor: statusBg }]}>
              <View style={[styles.statusDot, { backgroundColor: statusTextColor }]} />
              <Text style={[styles.statusPillText, { color: statusTextColor }]}>
                {activity.status}
              </Text>
            </View>
          </View>

          <Text style={[styles.activityTitle, { color: theme.colors.textPrimary }]}>
            {activity.title}
          </Text>

          {activity.description ? (
            <Text style={[styles.activityDesc, { color: theme.colors.textSecondary }]}>
              {activity.description}
            </Text>
          ) : null}

          {activity.dateCreated ? (
            <View style={[styles.dateRow, { borderTopColor: theme.colors.borderLight }]}>
              <Ionicons name="calendar-outline" size={14} color={theme.colors.textMuted} />
              <Text style={[styles.dateText, { color: theme.colors.textMuted }]}>
                Created: {activity.dateCreated}
              </Text>
            </View>
          ) : null}
        </View>

        {!hasExtraContent && (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                alignItems: 'center',
                paddingVertical: 32,
              },
            ]}
          >
            <Ionicons
              name="document-text-outline"
              size={40}
              color={theme.colors.textMuted}
              style={{ marginBottom: 8 }}
            />
            <Text style={{ fontSize: 16, fontWeight: '700', color: theme.colors.textPrimary, marginBottom: 4 }}>
              Empty Activity
            </Text>
            <Text style={{ fontSize: 13, color: theme.colors.textSecondary, textAlign: 'center' }}>
              No content added inside this activity card yet.
            </Text>
          </View>
        )}

        {activity.objectives && activity.objectives.length > 0 && (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionIconBox, { backgroundColor: theme.colors.primaryLight }]}>
                <Ionicons name="checkbox-outline" size={18} color={theme.colors.primary} />
              </View>
              <Text style={[styles.sectionHeading, { color: theme.colors.textPrimary }]}>
                Learning Objectives
              </Text>
            </View>

            {activity.objectives.map((objective, idx) => (
              <View key={idx} style={styles.objectiveRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={theme.colors.primary}
                  style={styles.checkIcon}
                />
                <Text style={[styles.objectiveText, { color: theme.colors.textSecondary }]}>
                  {objective}
                </Text>
              </View>
            ))}
          </View>
        )}

        {activity.instructions && activity.instructions.length > 0 && (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionIconBox, { backgroundColor: theme.colors.warningLight }]}>
                <Ionicons name="list-outline" size={18} color={theme.colors.warning} />
              </View>
              <Text style={[styles.sectionHeading, { color: theme.colors.textPrimary }]}>
                Step-by-Step Instructions
              </Text>
            </View>

            {activity.instructions.map((step, idx) => (
              <View key={idx} style={styles.stepItem}>
                <Text style={[styles.stepText, { color: theme.colors.textSecondary }]}>
                  {step}
                </Text>
              </View>
            ))}
          </View>
        )}

        {activity.content ? (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionIconBox, { backgroundColor: theme.colors.infoLight }]}>
                <Ionicons name="bulb-outline" size={18} color={theme.colors.info} />
              </View>
              <Text style={[styles.sectionHeading, { color: theme.colors.textPrimary }]}>
                Technical Concepts
              </Text>
            </View>

            <Text style={[styles.contentText, { color: theme.colors.textSecondary }]}>
              {activity.content}
            </Text>
          </View>
        ) : null}

        {activity.codeSnippet ? (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.isDark ? '#020617' : '#0F172A',
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.codeHeader}>
              <View style={styles.codeHeaderLeft}>
                <Ionicons name="code-slash" size={16} color="#94A3B8" />
                <Text style={styles.codeLanguage}>JavaScript / React Native</Text>
              </View>
              <Text style={styles.snippetTag}>Example</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Text style={styles.codeText}>{activity.codeSnippet}</Text>
            </ScrollView>
          </View>
        ) : null}
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
  card: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  numberPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  numberPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
    marginBottom: 8,
  },
  activityDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  dateText: {
    fontSize: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  sectionIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
  },
  objectiveRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  checkIcon: {
    marginTop: 2,
    marginRight: 8,
  },
  objectiveText: {
    fontSize: 13,
    lineHeight: 19,
    flex: 1,
  },
  stepItem: {
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(100, 116, 139, 0.15)',
  },
  stepText: {
    fontSize: 13,
    lineHeight: 19,
  },
  contentText: {
    fontSize: 13,
    lineHeight: 21,
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  codeHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  codeLanguage: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  snippetTag: {
    color: '#60A5FA',
    fontSize: 11,
    fontWeight: '700',
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  codeText: {
    color: '#E2E8F0',
    fontFamily: 'monospace',
    fontSize: 12.5,
    lineHeight: 18,
  },
  headerActionBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 12,
  },
  backBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ActivityDetailsScreen;
