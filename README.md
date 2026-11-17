# LabMaster – Educational Laboratory Compilation Mobile Application

LabMaster is a centralized compilation mobile application designed for students and educators to access, organize, browse, and review React Native laboratory activities. Built with **React Native** and **Expo**, it satisfies all technical requirements for academic mobile application development hands-on exercises.

---

## 📱 Features

- **Home Dashboard:**
  - Personalized welcome greeting with student credentials.
  - Dynamic statistics cards calculating Total, Completed, In-Progress, and Upcoming exercises from live data.
  - Quick action shortcuts to primary application destinations.
  - Recent activities feed with status indicators.
- **Activities Directory:**
  - Comprehensive catalog of laboratory exercises.
  - Real-time search by title, activity number, or keyword using `useState`.
  - Filter chips for status (`All`, `Completed`, `In Progress`, `Not Started`).
  - High-performance scrolling with `FlatList`.
- **Dynamic Activity Details:**
  - Reusable screen rendering laboratory number, title, description, and status.
  - Learning objectives checklist.
  - Step-by-step laboratory instructions.
  - Technical concepts breakdown and JavaScript / React Native code snippets.
  - Verification & compilation status indicators.
  - Native system share action.
- **Global Dark & Light Theme:**
  - Shared state managed via **React Context API** (`ThemeContext`).
  - Persistent theme mode across restarts using `@react-native-async-storage/async-storage`.
  - Immediate synchronized update across all screens and bottom navigation.
- **Modular Component Architecture:**
  - Fully reusable, prop-driven components (`CustomButton`, `ActivityCard`, `StatCard`, `SearchBar`, `CustomHeader`, `ThemeToggle`, `BottomNavigation`).
- **Responsive Flexbox Design:**
  - Adaptive two-column grids, fluid cards, and safe-area notch awareness for various Android display sizes.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **React Native (0.88+)** | Core mobile application framework |
| **Expo SDK (58+)** | Development toolchain & native modules |
| **JavaScript (ES6+)** | Primary programming language |
| **React Navigation (v7)** | Bottom Tabs and Native Stack navigation |
| **React Context API** | Application-wide theme state management |
| **AsyncStorage** | Local persistent storage for theme preference |
| **Expo Vector Icons (Ionicons)** | Native iconography |

---

## 📂 Project Directory Structure

```text
LabMaster/
├── App.js                         # Root application entry point
├── app.json                       # Expo configuration & metadata
├── package.json                   # Dependency definitions and scripts
├── assets/                        # App icons and splash assets
├── src/
│   ├── components/                # Reusable UI components
│   │   ├── ActivityCard.js        # Reusable laboratory exercise card
│   │   ├── BottomNavigation.js    # Reusable bottom navigation tab bar
│   │   ├── CustomButton.js        # Reusable button with variants
│   │   ├── CustomHeader.js        # Reusable screen header with back action
│   │   ├── SearchBar.js           # Reusable search input with clear trigger
│   │   ├── StatCard.js            # Reusable metric statistic card
│   │   └── ThemeToggle.js         # Reusable Dark/Light mode switch
│   ├── context/
│   │   └── ThemeContext.js        # Global theme provider (React Context)
│   ├── data/
│   │   └── activities.js          # Centralized laboratory activity dataset
│   ├── hooks/
│   │   └── useTheme.js            # Custom hook for theme consumption
│   ├── navigation/
│   │   └── AppNavigator.js        # Combined Stack & Bottom Tab navigator
│   ├── screens/
│   │   ├── AboutScreen.js         # App purpose & developer information
│   │   ├── ActivitiesScreen.js    # Filterable list of all activities
│   │   ├── ActivityDetailsScreen.js # Dynamic details & code snippet screen
│   │   ├── HomeScreen.js          # Central dashboard with statistics
│   │   └── SettingsScreen.js      # Student profile & appearance controls
│   ├── styles/
│   │   └── theme.js               # Centralized light & dark color palettes
│   └── utils/
│       └── storage.js             # AsyncStorage helper functions
└── README.md
```

---

## 🚀 Getting Started & Installation

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **bun**
- **Expo Go** app installed on your Android device (available on Google Play Store) or Android Studio Virtual Device (AVD).

### 2. Running the Application
Start the Metro development server:

```bash
npm start
```

- **Run on Android Device:** Scan the QR code in the terminal using the **Expo Go** app.
- **Run on Android Emulator:** Press `a` in the terminal with an active emulator running.
- **Run on Web Preview:** Press `w` to open in your browser.

---

## 👨‍💻 Developer Information

- **Developer:** Kaiser Octobre
- **Course:** BS Information Technology – Mobile Application Development
- **Project:** Hands-on Activity Compilation (LabMaster)
