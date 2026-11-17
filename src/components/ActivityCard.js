/**
 * ActivityCard.js
 * Reusable Activity Card component displaying:
 * - Activity number badge
 * - Title
 * - Status indicator with color coding
 * - Chevron indicator & touch feedback
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export const ActivityCard = ({ activity, onPress, style }) => {
  const { theme } = useTheme();

  // Status badge styling
  let statusBg = theme.colors.infoLight;
  let statusTextColor = theme.colors.info;

  if (activity.status === 'Completed') {
    statusBg = theme.colors.successLight;
    statusTextColor = theme.colors.success;
  } else if (activity.status === 'In Progress') {
    statusBg = theme.colors.warningLight;
    statusTextColor = theme.colors.warning;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
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
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <View style={[styles.numberBadge, { backgroundColor: theme.colors.primaryLight }]}>
            <Text style={[styles.numberText, { color: theme.colors.primary }]}>
              #{activity.activityNumber}
            </Text>
          </View>
          {activity.category ? (
            <Text style={[styles.categoryText, { color: theme.colors.textSecondary }]}>
              {activity.category}
            </Text>
          ) : null}
        </View>

        <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: statusTextColor },
            ]}
          />
          <Text style={[styles.statusText, { color: statusTextColor }]}>
            {activity.status}
          </Text>
        </View>
      </View>

      <Text
        style={[styles.title, { color: theme.colors.textPrimary }]}
        numberOfLines={2}
      >
        {activity.title}
      </Text>

      {activity.description ? (
        <Text
          style={[styles.description, { color: theme.colors.textSecondary }]}
          numberOfLines={2}
        >
          {activity.description}
        </Text>
      ) : null}

      <View style={[styles.cardFooter, { borderTopColor: theme.colors.borderLight }]}>
        {activity.dateCreated ? (
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={13} color={theme.colors.textMuted} />
            <Text style={[styles.dateText, { color: theme.colors.textMuted }]}>
              {activity.dateCreated}
            </Text>
          </View>
        ) : (
          <View />
        )}

        <View style={styles.viewDetailsRow}>
          <Text style={[styles.viewDetailsText, { color: theme.colors.primary }]}>
            View Activity
          </Text>
          <Ionicons name="chevron-forward" size={15} color={theme.colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  numberBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  numberText: {
    fontSize: 12,
    fontWeight: '700',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    flexShrink: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 22,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
  },
  viewDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default ActivityCard;
