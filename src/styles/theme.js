/**
 * Centralized Theme Configuration for LabMaster
 * Defines consistent colors, typography, spacing, and border radiuses
 * for both Light and Dark modes according to project specifications.
 */

export const lightTheme = {
  isDark: false,
  colors: {
    primary: '#2563EB',       // Modern Royal Blue
    primaryLight: '#EFF6FF',  // Subtle blue background
    secondary: '#64748B',     // Slate gray
    background: '#F8FAFC',    // Very soft cool gray
    surface: '#FFFFFF',       // Pure white cards/containers
    surfaceVariant: '#F1F5F9',// Subtle gray for input backgrounds/chips
    textPrimary: '#0F172A',   // High contrast slate
    textSecondary: '#64748B', // Medium slate
    textMuted: '#94A3B8',     // Light slate
    border: '#E2E8F0',        // Clean border divider
    borderLight: '#F1F5F9',
    success: '#16A34A',       // Green for completed
    successLight: '#DCFCE7',
    warning: '#F59E0B',       // Amber for in progress
    warningLight: '#FEF3C7',
    info: '#0EA5E9',          // Sky blue for upcoming/not started
    infoLight: '#E0F2FE',
    cardShadow: 'rgba(15, 23, 42, 0.06)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  typography: {
    h1: { fontSize: 26, fontWeight: '700' },
    h2: { fontSize: 20, fontWeight: '700' },
    h3: { fontSize: 16, fontWeight: '600' },
    body: { fontSize: 14, fontWeight: '400' },
    bodyBold: { fontSize: 14, fontWeight: '600' },
    caption: { fontSize: 12, fontWeight: '500' },
  },
};

export const darkTheme = {
  isDark: true,
  colors: {
    primary: '#60A5FA',       // Brighter blue for dark background
    primaryLight: '#1E3A8A',  // Deep blue tint
    secondary: '#94A3B8',     // Muted slate
    background: '#0F172A',    // Deep slate background
    surface: '#1E293B',       // Elevated surface
    surfaceVariant: '#334155',// Slightly lighter slate for inputs/chips
    textPrimary: '#F8FAFC',   // Crisp white/off-white text
    textSecondary: '#94A3B8', // Readable secondary text
    textMuted: '#64748B',     // Subtle muted text
    border: '#334155',        // Dark slate border
    borderLight: '#1E293B',
    success: '#4ADE80',       // Bright green
    successLight: 'rgba(74, 222, 128, 0.15)',
    warning: '#FBBF24',       // Bright amber
    warningLight: 'rgba(251, 191, 36, 0.15)',
    info: '#38BDF8',          // Bright sky blue
    infoLight: 'rgba(56, 189, 248, 0.15)',
    cardShadow: 'rgba(0, 0, 0, 0.35)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  typography: {
    h1: { fontSize: 26, fontWeight: '700' },
    h2: { fontSize: 20, fontWeight: '700' },
    h3: { fontSize: 16, fontWeight: '600' },
    body: { fontSize: 14, fontWeight: '400' },
    bodyBold: { fontSize: 14, fontWeight: '600' },
    caption: { fontSize: 12, fontWeight: '500' },
  },
};
