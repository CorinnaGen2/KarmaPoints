# KarmaPoints — React Native App

## Expo Version

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

## App Overview

KarmaPoints is a React Native app built with Expo that gamifies the donation experience. Users donate to causes linked to verified NGOs and track their Good Deeds weekly. The app uses cosmic/spiritual dark theme aesthetics with deep purple backgrounds and gold accents.

**Core value proposition:** Turn kindness into impact. Every good deed and donation earns Karma Points, leveling users up through 6 soul tiers (Seeker → Pilgrim → Guardian → Sage → Luminary → Enlightened Being).

**Business model:** When a user donates X amount, the platform retains 30% and 70% goes to the NGO. The split is transparently shown before confirmation.

## Tech Stack

- **Expo SDK 56** (latest)
- **React Native 0.85.3**
- **TypeScript** (strict mode)
- **expo-router** for file-based routing
- **@react-navigation/native** + **@react-navigation/native-stack** for navigation
- **react-native-reanimated** for animations
- **react-native-screens** + **react-native-safe-area-context** for native navigation
- **expo-image** for optimized images
- Path alias: `@/*` → `./src/*`, `@/assets/*` → `./assets/*`

## Navigation Structure

### Bottom Tab Navigation (4 tabs)

| Tab | Screen | Icon |
|-----|--------|------|
| **Home** | Home dashboard — soul journey orb, karma booster section, recent deeds section | ✦ |
| **Deeds** | Good deeds log — list of user's deeds with streak info | 📝 |
| **Causes** | Browse karma causes / NGO causes to donate to | 🌍 |
| **Profile** | User profile, stats, settings access | 👤 |

### Navigation flows

- **Home → Deeds**: "See All" button in the "Recent Deeds" section navigates to the Deeds tab
- **Home → Causes**: "See All" button in the "Karma Booster" section navigates to the Causes tab
- **Home/Deeds/Causes → Add Deed flow**: A floating plus (+) button visible on Home, Deeds, and Causes screens opens the Add Deed modal/flow
- **Profile → Settings**: From Profile, user navigates to a Settings screen
- **Profile → NO plus button**: The floating plus button is NOT visible on the Profile tab

### Settings screen actions

- Update email
- Update password
- Read Terms of Use
- Delete profile

### Add Deed flow

Triggered by the floating plus button on Home, Deeds, and Causes screens. Two-step flow:
1. Pick a category (Environment, Education, Health, Poverty, Animals, Community)
2. Choose from contextual suggestions or type a free-text deed

## Project Structure

```
src/
├── app/                    # expo-router file-based routes
│   ├── _layout.tsx         # Root layout
│   ├── index.tsx           # Entry / redirect
│   ├── (tabs)/             # Tab navigator group
│   │   ├── _layout.tsx     # Bottom tab layout
│   │   ├── home.tsx        # Home tab
│   │   ├── deeds.tsx       # Deeds tab
│   │   ├── causes.tsx      # Causes tab
│   │   └── profile.tsx     # Profile tab
│   └── settings.tsx        # Settings screen (outside tabs)
├── components/             # Reusable components
│   ├── SoulJourneyOrb.tsx  # Animated progress ring
│   ├── KarmaCauseCard.tsx  # Cause card with NGO link
│   ├── DonationConfirmModal.tsx  # 30/70 split display
│   ├── AddDeedModal.tsx    # Two-step deed modal
│   ├── CelebrationToast.tsx     # Success animation
│   └── FloatingPlusButton.tsx   # FAB for adding deeds
├── constants/
│   └── theme.ts            # Colors, typography, spacing
├── hooks/                  # Custom hooks
├── context/                # React Context providers
├── services/               # API client, donation service
├── types/                  # TypeScript type definitions
└── data/                   # Mock data for development
```

## Coding Conventions

- Use TypeScript strict mode for all files
- Use path aliases: import from `@/components/...`, `@/constants/...`, etc.
- Use expo-router's file-based routing — do NOT manually create navigation stacks
- Follow the cosmic dark theme colors defined in `src/constants/theme.ts`
- All components are functional components with TypeScript interfaces for props
- Use `react-native-reanimated` for all animations (not Animated from RN)
- Keep components small and composable — one concern per file

## Key Business Logic

**Donation 30/70 split:** When a user donates amount X:
- Platform retains: X × 0.30
- NGO receives: X × 0.70
- This split MUST be transparently shown to the user BEFORE they confirm the donation

**Karma Points:**
- Each good deed earns karma points (base: 10 XP)
- Each euro donated earns 10 karma points
- Points accumulate and determine the user's soul tier

**Soul Tier Thresholds:**
| Tier | Min Points | Max Points |
|------|-----------|------------|
| Seeker | 0 | 100 |
| Pilgrim | 100 | 300 |
| Guardian | 300 | 700 |
| Sage | 700 | 1,500 |
| Luminary | 1,500 | 3,000 |
| Enlightened Being | 3,000 | ∞ |

## Environment

- Node.js with npm
- Expo CLI (`npx expo`)
- iOS Simulator / Android Emulator for testing
- Backend API runs at `http://localhost:3001` in development

## More Info

Additional details about ad monetization, Amazon affiliate, Stripe integration, and social media strategy will be added in future updates.
