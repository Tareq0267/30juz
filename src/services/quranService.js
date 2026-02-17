import { getFromStore, putInStore } from '../db/db'

const API_BASE = 'https://api.alquran.cloud/v1'

const EDITIONS = {
  arabic: 'quran-uthmani',
  english: 'en.sahih',
  malay: 'ms.basmeih',
}

async function fetchEdition(juz, edition) {
  // Check cache first
  const cached = await getFromStore('cached_ayah', [juz, edition])
  if (cached) return cached.ayahs

  const res = await fetch(`${API_BASE}/juz/${juz}/${edition}`)
  if (!res.ok) throw new Error(`Quran API error: ${res.status}`)

  const json = await res.json()
  const ayahs = json.data.ayahs.map((a) => ({
    number: a.number,
    numberInSurah: a.numberInSurah,
    text: a.text,
    surahName: a.surah.name,
    surahEnglishName: a.surah.englishName,
    surahNumber: a.surah.number,
  }))

  // Cache in IndexedDB
  await putInStore('cached_ayah', { juz, edition, ayahs, cachedAt: Date.now() })

  return ayahs
}

// Fetch all 3 editions for a Juz and merge by ayah number
export async function fetchJuz(juz) {
  const [arabic, english, malay] = await Promise.all([
    fetchEdition(juz, EDITIONS.arabic),
    fetchEdition(juz, EDITIONS.english),
    fetchEdition(juz, EDITIONS.malay),
  ])

  // Merge by ayah number
  const merged = arabic.map((ar, i) => ({
    number: ar.number,
    numberInSurah: ar.numberInSurah,
    surahName: ar.surahName,
    surahEnglishName: ar.surahEnglishName,
    surahNumber: ar.surahNumber,
    arabic: ar.text,
    english: english[i]?.text || '',
    malay: malay[i]?.text || '',
  }))

  return merged
}

// Split a Juz's ayahs into 5 roughly equal segments
export function splitIntoSegments(ayahs) {
  const total = ayahs.length
  const segmentSize = Math.ceil(total / 5)
  const segments = []

  for (let i = 0; i < 5; i++) {
    const start = i * segmentSize
    const end = Math.min(start + segmentSize, total)
    segments.push(ayahs.slice(start, end))
  }

  // If last segment is empty (unlikely), merge into previous
  return segments.filter((s) => s.length > 0)
}
