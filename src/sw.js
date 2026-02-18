import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

// ─── Activate immediately on update ───
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

// ─── Workbox Precaching ───
cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

// ─── Offline Navigation Fallback ───
// SPA: serve index.html for all navigation requests; if offline and not cached, show offline.html
const navigationHandler = async (params) => {
  try {
    return await new NetworkFirst({
      cacheName: 'navigations',
      plugins: [new CacheableResponsePlugin({ statuses: [200] })],
    }).handle(params)
  } catch (e) {
    return caches.match('/offline.html') || Response.error()
  }
}
registerRoute(new NavigationRoute(navigationHandler))

// ─── Runtime Caching ───
// Quran API — stale-while-revalidate for fast offline reads + background refresh
registerRoute(
  ({ url }) => url.origin === 'https://api.alquran.cloud',
  new StaleWhileRevalidate({
    cacheName: 'quran-api-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 }),
    ],
  })
)

// Prayer API — network first, cache for 1 day
registerRoute(
  ({ url }) => url.origin === 'https://api.aladhan.com',
  new NetworkFirst({
    cacheName: 'prayer-api-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 }),
    ],
  })
)

// Font CDN — cache first (fonts don't change)
registerRoute(
  ({ url }) =>
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'font-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 90 }),
    ],
  })
)

// ─── Prayer Notification System ───
let prayerTimes = null
let dayNumber = 1
let notificationsEnabled = false
let notifiedPrayers = {}
let lastCheckedDate = null

const PRAYER_LABELS = {
  Fajr: { emoji: '🌅', name: 'Subuh', message: 'Waktu Subuh. Mulakan bacaan Al-Quran anda.' },
  Dhuhr: { emoji: '☀️', name: 'Zohor', message: 'Waktu Zohor. Teruskan bacaan Juz anda.' },
  Asr: { emoji: '🌤️', name: 'Asar', message: 'Waktu Asar. Teruskan bacaan anda.' },
  Maghrib: { emoji: '🌇', name: 'Maghrib', message: 'Waktu Maghrib. Teruskan bacaan Juz anda.' },
  Isha: { emoji: '🌙', name: 'Isyak', message: 'Waktu Isyak. Lengkapkan bacaan hari ini.' },
}

function parseToMinutes(timeStr) {
  const clean = timeStr.replace(/\s*\(.*\)/, '').trim()
  const [h, m] = clean.split(':').map(Number)
  return h * 60 + m
}

function getCurrentMinutes() {
  const now = new Date()
  return now.getHours() * 60 + now.getMinutes()
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10)
}

function checkAndNotify() {
  if (!notificationsEnabled || !prayerTimes) return

  const today = getTodayKey()

  if (lastCheckedDate !== today) {
    notifiedPrayers = {}
    lastCheckedDate = today
  }

  const currentMinutes = getCurrentMinutes()
  const prayerKeys = Object.keys(PRAYER_LABELS)

  for (const prayer of prayerKeys) {
    if (notifiedPrayers[prayer] || !prayerTimes[prayer]) continue

    const prayerMinutes = parseToMinutes(prayerTimes[prayer])
    const diff = currentMinutes - prayerMinutes

    if (diff >= 0 && diff <= 5) {
      notifiedPrayers[prayer] = true
      const info = PRAYER_LABELS[prayer]
      const segmentIndex = prayerKeys.indexOf(prayer) + 1

      self.registration.showNotification(
        `${info.emoji} Waktu ${info.name}`,
        {
          body: `${info.message} Juz ${dayNumber}, Segment ${segmentIndex}.`,
          icon: '/icons/icon-192.png',
          badge: '/icons/icon-192.png',
          tag: `prayer-${prayer}-${today}`,
          renotify: false,
          data: { url: `/reader/${dayNumber}?segment=${segmentIndex}` },
        }
      )
    }
  }
}

// Listen for messages from the main app
self.addEventListener('message', (event) => {
  if (!event.data?.type) return

  if (event.data.type === 'UPDATE_PRAYER_TIMES') {
    prayerTimes = event.data.prayers
    dayNumber = event.data.dayNumber
    checkAndNotify()
  }

  if (event.data.type === 'TOGGLE_NOTIFICATIONS') {
    notificationsEnabled = event.data.enabled
    if (notificationsEnabled) checkAndNotify()
  }
})

// Handle notification click — open the reader
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes(self.location.origin)) {
          client.focus()
          client.navigate(url)
          return
        }
      }
      return self.clients.openWindow(url)
    })
  )
})

// 10-minute interval check
setInterval(checkAndNotify, 10 * 60 * 1000)
