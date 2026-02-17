import { openDB } from 'idb'

const DB_NAME = 'ramadhan30juz'
const DB_VERSION = 1

let dbPromise = null

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('prayer_times')) {
          db.createObjectStore('prayer_times', { keyPath: 'date' })
        }
        if (!db.objectStoreNames.contains('progress')) {
          db.createObjectStore('progress', { keyPath: ['day', 'prayer'] })
        }
        if (!db.objectStoreNames.contains('highlights')) {
          db.createObjectStore('highlights', { autoIncrement: true })
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' })
        }
        if (!db.objectStoreNames.contains('cached_ayah')) {
          db.createObjectStore('cached_ayah', { keyPath: ['juz', 'edition'] })
        }
      },
    })
  }
  return dbPromise
}

export async function getSetting(key) {
  const db = await getDB()
  const result = await db.get('settings', key)
  return result?.value ?? null
}

export async function setSetting(key, value) {
  const db = await getDB()
  await db.put('settings', { key, value })
}

export async function getFromStore(storeName, key) {
  const db = await getDB()
  return db.get(storeName, key)
}

export async function putInStore(storeName, value) {
  const db = await getDB()
  return db.put(storeName, value)
}

export async function getAllFromStore(storeName) {
  const db = await getDB()
  return db.getAll(storeName)
}

export async function deleteFromStore(storeName, key) {
  const db = await getDB()
  return db.delete(storeName, key)
}

export { getDB }
