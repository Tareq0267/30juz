import { getFromStore, putInStore } from '../db/db'

const ALADHAN_BASE = 'https://api.aladhan.com/v1'
// Method 3 = Muslim World League; method 4 = Umm Al-Qura
// For Malaysia (JAKIM), we use method 3 with Shafi school (shafaq=1)
const METHOD = 3

const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

function todayDateString() {
  const d = new Date()
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}-${mm}-${yyyy}`
}

function isoDateString() {
  return new Date().toISOString().slice(0, 10)
}

// Parse "HH:MM" or "HH:MM (MYT)" into { hours, minutes }
function parseTimeString(str) {
  const clean = str.replace(/\s*\(.*\)/, '').trim()
  const [hours, minutes] = clean.split(':').map(Number)
  return { hours, minutes }
}

// Convert prayer time to a Date object for today
function prayerToDate(timeStr) {
  const { hours, minutes } = parseTimeString(timeStr)
  const now = new Date()
  now.setHours(hours, minutes, 0, 0)
  return now
}

export async function fetchPrayerTimes(lat, lng) {
  const dateStr = todayDateString()
  const isoDate = isoDateString()

  // Check IndexedDB cache first
  const cached = await getFromStore('prayer_times', isoDate)
  if (cached) {
    return cached
  }

  // Fetch from Aladhan API
  const url = `${ALADHAN_BASE}/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=${METHOD}&school=1`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Aladhan API error: ${res.status}`)
  }

  const json = await res.json()
  const timings = json.data.timings

  // Extract only the 5 prayer times we need
  const prayers = {}
  for (const key of PRAYER_KEYS) {
    prayers[key] = timings[key]
  }

  const record = {
    date: isoDate,
    prayers,
    sunrise: timings.Sunrise,
    sunset: timings.Sunset,
    lat,
    lng,
    fetchedAt: Date.now(),
  }

  // Cache in IndexedDB
  await putInStore('prayer_times', record)

  return record
}

// Get the current or next prayer based on current time
export function getCurrentPrayer(prayers) {
  const now = new Date()

  for (let i = PRAYER_KEYS.length - 1; i >= 0; i--) {
    const key = PRAYER_KEYS[i]
    const prayerDate = prayerToDate(prayers[key])
    if (now >= prayerDate) {
      return {
        current: key,
        currentIndex: i,
        next: PRAYER_KEYS[i + 1] || null,
        nextIndex: i + 1 < PRAYER_KEYS.length ? i + 1 : null,
      }
    }
  }

  // Before Fajr — show Isha as current (from previous day), Fajr as next
  return {
    current: null,
    currentIndex: null,
    next: 'Fajr',
    nextIndex: 0,
  }
}

// Get time remaining until a prayer time string
export function getTimeUntil(timeStr) {
  const target = prayerToDate(timeStr)
  const now = new Date()
  const diff = target - now

  if (diff <= 0) return null

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

export { PRAYER_KEYS }
