// Deterministic Juz metadata
// Each Juz maps to: starting surah:ayah, ending surah:ayah, and descriptive label
// Source: Standard Uthmani mushaf Juz boundaries

export const JUZ_DATA = [
  { juz: 1,  startSurah: 1,  startAyah: 1,   endSurah: 2,  endAyah: 141,  label: 'Al-Fatihah → Al-Baqarah' },
  { juz: 2,  startSurah: 2,  startAyah: 142,  endSurah: 2,  endAyah: 252,  label: 'Al-Baqarah' },
  { juz: 3,  startSurah: 2,  startAyah: 253,  endSurah: 3,  endAyah: 92,   label: 'Al-Baqarah → Ali Imran' },
  { juz: 4,  startSurah: 3,  startAyah: 93,   endSurah: 4,  endAyah: 23,   label: 'Ali Imran → An-Nisa' },
  { juz: 5,  startSurah: 4,  startAyah: 24,   endSurah: 4,  endAyah: 147,  label: 'An-Nisa' },
  { juz: 6,  startSurah: 4,  startAyah: 148,  endSurah: 5,  endAyah: 81,   label: 'An-Nisa → Al-Ma\'idah' },
  { juz: 7,  startSurah: 5,  startAyah: 82,   endSurah: 6,  endAyah: 110,  label: 'Al-Ma\'idah → Al-An\'am' },
  { juz: 8,  startSurah: 6,  startAyah: 111,  endSurah: 7,  endAyah: 87,   label: 'Al-An\'am → Al-A\'raf' },
  { juz: 9,  startSurah: 7,  startAyah: 88,   endSurah: 8,  endAyah: 40,   label: 'Al-A\'raf → Al-Anfal' },
  { juz: 10, startSurah: 8,  startAyah: 41,   endSurah: 9,  endAyah: 92,   label: 'Al-Anfal → At-Tawbah' },
  { juz: 11, startSurah: 9,  startAyah: 93,   endSurah: 11, endAyah: 5,    label: 'At-Tawbah → Hud' },
  { juz: 12, startSurah: 11, startAyah: 6,    endSurah: 12, endAyah: 52,   label: 'Hud → Yusuf' },
  { juz: 13, startSurah: 12, startAyah: 53,   endSurah: 14, endAyah: 52,   label: 'Yusuf → Ibrahim' },
  { juz: 14, startSurah: 15, startAyah: 1,    endSurah: 16, endAyah: 128,  label: 'Al-Hijr → An-Nahl' },
  { juz: 15, startSurah: 17, startAyah: 1,    endSurah: 18, endAyah: 74,   label: 'Al-Isra → Al-Kahf' },
  { juz: 16, startSurah: 18, startAyah: 75,   endSurah: 20, endAyah: 135,  label: 'Al-Kahf → Ta-Ha' },
  { juz: 17, startSurah: 21, startAyah: 1,    endSurah: 22, endAyah: 78,   label: 'Al-Anbiya → Al-Hajj' },
  { juz: 18, startSurah: 23, startAyah: 1,    endSurah: 25, endAyah: 20,   label: 'Al-Mu\'minun → Al-Furqan' },
  { juz: 19, startSurah: 25, startAyah: 21,   endSurah: 27, endAyah: 55,   label: 'Al-Furqan → An-Naml' },
  { juz: 20, startSurah: 27, startAyah: 56,   endSurah: 29, endAyah: 45,   label: 'An-Naml → Al-Ankabut' },
  { juz: 21, startSurah: 29, startAyah: 46,   endSurah: 33, endAyah: 30,   label: 'Al-Ankabut → Al-Ahzab' },
  { juz: 22, startSurah: 33, startAyah: 31,   endSurah: 36, endAyah: 27,   label: 'Al-Ahzab → Ya-Sin' },
  { juz: 23, startSurah: 36, startAyah: 28,   endSurah: 39, endAyah: 31,   label: 'Ya-Sin → Az-Zumar' },
  { juz: 24, startSurah: 39, startAyah: 32,   endSurah: 41, endAyah: 46,   label: 'Az-Zumar → Fussilat' },
  { juz: 25, startSurah: 41, startAyah: 47,   endSurah: 45, endAyah: 37,   label: 'Fussilat → Al-Jathiyah' },
  { juz: 26, startSurah: 46, startAyah: 1,    endSurah: 51, endAyah: 30,   label: 'Al-Ahqaf → Adh-Dhariyat' },
  { juz: 27, startSurah: 51, startAyah: 31,   endSurah: 57, endAyah: 29,   label: 'Adh-Dhariyat → Al-Hadid' },
  { juz: 28, startSurah: 58, startAyah: 1,    endSurah: 66, endAyah: 12,   label: 'Al-Mujadila → At-Tahrim' },
  { juz: 29, startSurah: 67, startAyah: 1,    endSurah: 77, endAyah: 50,   label: 'Al-Mulk → Al-Mursalat' },
  { juz: 30, startSurah: 78, startAyah: 1,    endSurah: 114, endAyah: 6,   label: 'An-Naba → An-Nas' },
]

// Prayer-to-segment mapping (deterministic)
export const PRAYER_SEGMENTS = [
  { index: 0, prayer: 'Fajr',    label: 'Fajr — Segment 1' },
  { index: 1, prayer: 'Dhuhr',   label: 'Dhuhr — Segment 2' },
  { index: 2, prayer: 'Asr',     label: 'Asr — Segment 3' },
  { index: 3, prayer: 'Maghrib', label: 'Maghrib — Segment 4' },
  { index: 4, prayer: 'Isha',    label: 'Isha — Segment 5' },
]

// Ramadhan day = Juz number. Day 1 → Juz 1, Day 30 → Juz 30.
export function getJuzForDay(day) {
  const clamped = Math.max(1, Math.min(30, day))
  return JUZ_DATA[clamped - 1]
}

// Get segment index for a given prayer name
export function getSegmentForPrayer(prayerName) {
  const found = PRAYER_SEGMENTS.find((s) => s.prayer === prayerName)
  return found ? found.index : 0
}
