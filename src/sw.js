import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

// ─── Workbox Precaching ───
// __WB_MANIFEST is injected by vite-plugin-pwa in injectManifest mode
precacheAndRoute(self.__WB_MANIFEST)

// ─── Runtime Caching ───
// Quran API — network first, cache for 30 days
registerRoute(
  ({ url }) => url.origin === 'https://api.alquran.cloud',
  new NetworkFirst({
    cacheName: 'quran-api-cache',
    plugins: [new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 })],
  })
)

// Prayer API — network first, cache for 1 day
registerRoute(
  ({ url }) => url.origin === 'https://api.aladhan.com',
  new NetworkFirst({
    cacheName: 'prayer-api-cache',
    plugins: [new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 })],
  })
)

// Font CDN — network first, cache for 30 days
registerRoute(
  ({ url }) => url.origin === 'https://fonts.cdnfonts.com',
  new NetworkFirst({
    cacheName: 'font-cache',
    plugins: [new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 })],
  })
)

// ─── Prayer Notification System ───
let prayerTimes = null
let dayNumber = 1
let notificationsEnabled = false
let notifiedPrayers = {}
let lastCheckedDate = null

const PRAYER_LABELS = {
  Fajr: { emoji: '🌅', message: 'Time for Fajr. Start your Quran reading.' },
  Dhuhr: { emoji: '☀️', message: 'Dhuhr time. Continue your Juz reading.' },
  Asr: { emoji: '🌤️', message: 'Asr time. Keep up with your reading.' },
  Maghrib: { emoji: '🌇', message: 'Maghrib time. Continue your Juz reading.' },
  Isha: { emoji: '🌙', message: "Isha time. Complete today's reading." },
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
        `${info.emoji} ${prayer} Time`,
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
