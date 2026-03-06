// Seed all 150 progress entries into IndexedDB so you can test the khatam UI.
// Run with: node scripts/seed-khatam.js
// Requires the dev server to be running at http://localhost:5173

import { chromium } from 'playwright'

const APP_URL = 'http://localhost:5173'
const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

const browser = await chromium.launch({ headless: false })
const page = await browser.newPage()

console.log('Opening app...')
await page.goto(APP_URL)
await page.waitForLoadState('networkidle')

console.log('Seeding all 150 segments into IndexedDB...')
await page.evaluate((prayers) => {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('ramadhan30juz', 1)
    req.onsuccess = () => {
      const db = req.result
      const tx = db.transaction('progress', 'readwrite')
      const store = tx.objectStore('progress')
      for (let day = 1; day <= 30; day++) {
        for (const prayer of prayers) {
          store.put({ day, prayer, completedAt: Date.now() })
        }
      }
      tx.oncomplete = resolve
      tx.onerror = () => reject(tx.error)
    }
    req.onerror = () => reject(req.error)
  })
}, PRAYERS)

console.log('Done! Navigating to /progress...')
await page.goto(`${APP_URL}/progress`)
await page.waitForLoadState('networkidle')

console.log('Browser is open — you should see the khatam modal.')
// Leave the browser open so you can interact with it
