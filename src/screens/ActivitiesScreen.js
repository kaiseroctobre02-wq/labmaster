/**
 * ActivitiesScreen.js
 * Screen displaying the complete compilation of laboratory activities.
 * Features:
 * - Search by title and description using useState
 * - Filter by status (All, Completed, In Progress, Not Started)
 * - Category badge chips
 * - FlatList implementation with smooth performance
 * - Dynamic empty state and result counters
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { activitiesData } from '../data/activities';
import { ActivityCard } from '../components/ActivityCard';
import { SearchBar } from '../components/SearchBar';

const STATUS_FILTERS = ['All', 'Completed', 'In Progress', 'Not Started'];

export const ActivitiesScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Demonstration of useState for local search query and filter selection
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Derive unique categories from dataset
  const categories = useMemo(() => {
    const list = activitiesData.map((item) => item.category);
    return ['All', ...new Set(list)];
  }, []);

  // Filter activities based on search text, status, and category
  const filteredActivities = useMemo(() => {
    return activitiesData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.activityNumber.includes(searchQuery);

      const matchesStatus =
        selectedStatus === 'All' || item.status === selectedStatus;

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, selectedStatus, selectedCategory]);

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
      {/* Top Header */}
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
          Laboratory Activities
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Browse, filter, and study all exercises
        </Text>

        {/* Search Input */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by title, number or topic..."
          style={styles.searchBar}
        />
      </View>

      {/* Filter Controls Section */}
      <View
        style={[
          styles.filtersContainer,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        {/* Status Horizontal Filter Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statusChipsRow}
        >
          {STATUS_FILTERS.map((status) => {
            const isSelected = selectedStatus === status;
            return (
              <TouchableOpacity
                key={status}
                activeOpacity={0.7}
                onPress={() => setSelectedStatus(status)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.surfaceVariant,
                    borderColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: isSelected ? '#FFFFFF' : theme.colors.textSecondary,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Result Count Banner */}
      <View style={styles.resultsInfoRow}>
        <Text style={[styles.resultsCountText, { color: theme.colors.textSecondary }]}>
          Showing {filteredActivities.length} of {activitiesData.length} activities
        </Text>
        {(searchQuery !== '' || selectedStatus !== 'All') && (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              setSelectedStatus('All');
              setSelectedCategory('All');
            }}
          >
            <Text style={[styles.resetFilterText, { color: theme.colors.primary }]}>
              Clear Filters
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Activities List (FlatList for high performance) */}
      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityCard
            activity={item}
            onPress={() => navigation.navigate('ActivityDetails', { activity: item })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View
              style={[
                styles.emptyIconBox,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <Ionicons
                name={searchQuery ? 'search' : 'folder-open-outline'}
                size={36}
                color={theme.colors.textMuted}
              />
            </View>
            <Text style={[styles.emptyTitle, { color: theme.colors.textPrimary }]}>
              {searchQuery ? 'No Activities Found' : 'No Activities Compiled Yet'}
            </Text>
            <Text
              style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
            >
              {searchQuery
                ? 'No activities matched your current search criteria. Try clearing filters or using another keyword.'
                : 'Your laboratory compilation platform is ready. Future laboratory exercises can be added here.'}
            </Text>
          </View>
        }
      />
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
    marginBottom: 12,
  },
  searchBar: {
    marginTop: 4,
  },
  filtersContainer: {
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  statusChipsRow: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
  },
  resultsInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  resultsCountText: {
    fontSize: 12,
    fontWeight: '500',
  },
  resetFilterText: {
    fontSize: 12,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  emptyIconBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default ActivitiesScreen;
