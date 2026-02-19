# Ramadhan 30 Juz

A Malaysia-focused Ramadhan Quran Companion PWA that helps you complete 30 Juz in 30 days by splitting each Juz into 5 segments mapped to the 5 daily prayers.

## Features

### Quran Reader
- **Uthmanic Arabic text** rendered with Amiri Quran font for accurate diacritic display
- **Dual translations** — English (Saheeh International) and Malay (Basmeih), individually toggleable
- **5 segments per Juz** — each mapped to a prayer time (Subuh, Zohor, Asar, Maghrib, Isyak)
- **Adjustable font size** (20–48px) for Arabic script
- **Highlight ayat** — tap any ayat to bookmark it, persisted locally
- **Juz navigation** — browse all 30 Juz with a visual picker grid

### Prayer Times
- **Malaysian prayer times** via Aladhan API (MWL method, Shafi school)
- **16 Malaysian states** with coordinates for accurate timing
- **GPS support** — auto-detect your location or manually select a state
- **Live current/next prayer** indicator with countdown

### Progress Tracking
- **Per-segment completion** — mark each prayer's reading segment as done
- **30-day visual grid** — color-coded progress overview
- **Stats dashboard** — days completed, segments read, overall percentage
- **Expandable day detail** — toggle individual segments on/off

### Ramadhan Day
- **Auto-calculated** from 19 February 2026 (1 Ramadhan 1447H)
- **Manual override** — stepper control + quick-select 30-day grid
- Day N = Juz N (Day 1 reads Juz 1, Day 30 reads Juz 30)

### PWA & Offline
- **Installable** on Android and iOS (Add to Home Screen)
- **Offline-capable** — precached app shell + cached API responses
- **Smart caching** — StaleWhileRevalidate for Quran data, NetworkFirst for prayer times, CacheFirst for fonts
- **Offline fallback page** when network is unavailable

### Prayer Notifications
- **Automated reminders** at each prayer time with your current Juz and segment
- **Service worker-based** — works in the background
- **iOS PWA support** with appropriate warnings for limitations
- **Notification messages in Bahasa Malaysia**

### UI/UX
- **Dark mode** with smooth transitions, persisted preference
- **Responsive design** — optimized for mobile-first usage
- **Custom color palette** — olive-leaf, black-forest, cornsilk, sunlit-clay, copperwood
- **Install banner** — prompts users to add to home screen

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 |
| Routing | react-router-dom v7 |
| PWA | vite-plugin-pwa (injectManifest) + Workbox |
| Storage | IndexedDB via `idb` |
| Quran API | [Al Quran Cloud](https://alquran.cloud/api) (quran-uthmani, en.sahih, ms.basmeih) |
| Prayer API | [Aladhan](https://aladhan.com/prayer-times-api) (method 3, school 1) |
| Font | [Amiri Quran](https://fonts.google.com/specimen/Amiri+Quran) via Google Fonts |

## Project Structure

```
src/
├── main.jsx                    # Entry point with BrowserRouter
├── App.jsx                     # Root component, route definitions, global hooks
├── index.css                   # Tailwind config, theme colors, Amiri Quran font
├── sw.js                       # Service worker (Workbox + prayer notifications)
│
├── pages/
│   ├── HomePage.jsx            # Dashboard: prayer times, today's segments, progress
│   ├── ReaderPage.jsx          # Quran reader with Juz picker, segments, controls
│   ├── ProgressPage.jsx        # 30-day grid, stats, segment detail
│   └── SettingsPage.jsx        # Day selector, location, font size, notifications
│
├── components/
│   ├── Header.jsx              # Sticky nav bar with 4 tabs + dark mode toggle
│   ├── Layout.jsx              # Page wrapper with max-width constraint
│   ├── AyahCard.jsx            # Verse card: Arabic + English + Malay + highlight
│   ├── SegmentTabs.jsx         # 5 prayer tabs with completion checkmarks
│   ├── FontSizeSlider.jsx      # Arabic font size range slider
│   ├── DarkModeToggle.jsx      # Animated sun/moon toggle
│   ├── LoadingSkeleton.jsx     # Animated loading placeholder cards
│   └── InstallBanner.jsx       # PWA install prompt banner
│
├── hooks/
│   ├── useDarkMode.js          # Dark mode state + IndexedDB persistence
│   ├── usePrayerTimes.js       # Prayer times fetch + GPS/state selection
│   ├── useRamadhanDay.js       # Auto/manual Ramadhan day calculation
│   ├── useProgress.js          # Segment completion tracking (30x5 grid)
│   ├── useQuranData.js         # Quran API fetch + segment splitting
│   ├── useHighlights.js        # Ayat highlight toggle + IndexedDB
│   ├── useFontSize.js          # Arabic font size preference
│   ├── useNotifications.js     # Permission + SW notification coordination
│   ├── useTranslationToggle.js # English/Malay visibility toggle
│   └── useInstallPrompt.js     # PWA beforeinstallprompt capture
│
├── services/
│   ├── quranService.js         # Al Quran Cloud API: 3 editions fetch + merge
│   └── prayerService.js        # Aladhan API: prayer times + current prayer
│
├── utils/
│   ├── geolocation.js          # Browser geolocation wrapper
│   └── notifications.js        # Notification API helpers + iOS detection
│
├── data/
│   ├── juzSplit.js             # 30 Juz metadata + prayer-segment mapping
│   └── malaysiaStates.js       # 16 Malaysian states with coordinates
│
└── db/
    └── db.js                   # IndexedDB: 5 stores, CRUD helpers

public/
├── offline.html                # Offline fallback page
└── icons/
    ├── icon-192.png            # PWA icon 192x192
    └── icon-512.png            # PWA icon 512x512
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy

The app is configured for static hosting. Push to GitHub and connect to **Vercel** for automatic deployments:

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Import the repository
3. Framework is auto-detected as Vite — click Deploy
4. Every `git push` triggers auto-redeploy

## Design System

| Token | Color | Hex | Usage |
|-------|-------|-----|-------|
| `olive-leaf` | Dark olive green | `#606c38` | Primary buttons, active states, completion |
| `black-forest` | Deep forest green | `#283618` | Header, text, theme color |
| `cornsilk` | Warm cream | `#fefae0` | Background, light text |
| `sunlit-clay` | Warm amber | `#dda15e` | Accents, current prayer, active nav |
| `copperwood` | Deep copper | `#bc6c25` | Secondary actions, links |

## Data Flow

```
Aladhan API --> usePrayerTimes --> HomePage (prayer chips)
                                  SW (notification scheduling)

Al Quran Cloud API --> useQuranData --> ReaderPage (ayat display)
    (3 editions)          |
                     IndexedDB cache

useRamadhanDay --> day number --> Juz mapping --> segment split
                                  (juzSplit.js)

useProgress --> IndexedDB --> completion state --> all pages
```

## IndexedDB Stores

| Store | Key | Purpose |
|-------|-----|---------|
| `prayer_times` | ISO date | Cached daily prayer times per location |
| `progress` | `{day}-{prayer}` | Segment completion flags (30 days x 5 prayers) |
| `highlights` | ayat number | User-highlighted verses |
| `settings` | setting key | Preferences (dark mode, font size, location, day, translations) |
| `cached_ayah` | edition-juz key | Cached Quran API responses per edition per juz |

## Localization

The app uses Bahasa Malaysia for prayer names and notifications:

| API Key | Display Name |
|---------|-------------|
| Fajr | Subuh |
| Dhuhr | Zohor |
| Asr | Asar |
| Maghrib | Maghrib |
| Isha | Isyak |

## Service Worker Caching Strategy

| Resource | Strategy | TTL | Reason |
|----------|----------|-----|--------|
| App shell (HTML/CSS/JS) | Precache | Until next deploy | Core assets for offline use |
| Quran API (`alquran.cloud`) | StaleWhileRevalidate | 30 days | Fast offline reads + background refresh |
| Prayer API (`aladhan.com`) | NetworkFirst | 1 day | Needs fresh daily data |
| Fonts (Google Fonts) | CacheFirst | 90 days | Fonts never change |
| Navigation requests | NetworkFirst + fallback | - | SPA routing with offline.html fallback |

## License

This project is for personal and educational use.

---

Built with React, Tailwind CSS, and the Al Quran Cloud API for Ramadhan 1447H.
