import { useState, useEffect, useCallback } from 'react'
import { getFromStore, putInStore, getAllFromStore, getDB } from '../db/db'

// Progress record shape: { day: number, prayer: string, completedAt: number }
// Composite key: [day, prayer]

export function useProgress() {
  const [completedSegments, setCompletedSegments] = useState(new Map())
  const [loaded, setLoaded] = useState(false)

  // Load all progress on mount
  useEffect(() => {
    getAllFromStore('progress').then((records) => {
      const map = new Map()
      for (const r of records) {
        map.set(`${r.day}-${r.prayer}`, r)
      }
      setCompletedSegments(map)
      setLoaded(true)
    })
  }, [])

  const isSegmentComplete = useCallback(
    (day, prayer) => completedSegments.has(`${day}-${prayer}`),
    [completedSegments]
  )

  const toggleSegment = useCallback(async (day, prayer) => {
    const key = `${day}-${prayer}`
    setCompletedSegments((prev) => {
      const next = new Map(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.set(key, { day, prayer, completedAt: Date.now() })
      }
      return next
    })

    // Persist
    const existing = await getFromStore('progress', [day, prayer])
    if (existing) {
      const db = await getDB()
      await db.delete('progress', [day, prayer])
    } else {
      await putInStore('progress', { day, prayer, completedAt: Date.now() })
    }
  }, [])

  const markSegmentComplete = useCallback(async (day, prayer) => {
    const key = `${day}-${prayer}`
    if (completedSegments.has(key)) return // Already complete

    setCompletedSegments((prev) => {
      const next = new Map(prev)
      next.set(key, { day, prayer, completedAt: Date.now() })
      return next
    })
    await putInStore('progress', { day, prayer, completedAt: Date.now() })
  }, [completedSegments])

  // Count completions for a given day (0-5)
  const getDayProgress = useCallback(
    (day) => {
      const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
      return prayers.filter((p) => completedSegments.has(`${day}-${p}`)).length
    },
    [completedSegments]
  )

  // Total completed segments across all 30 days
  const totalCompleted = completedSegments.size

  // Total days fully completed (5/5)
  const daysFullyCompleted = Array.from({ length: 30 }, (_, i) => i + 1).filter(
    (d) => getDayProgress(d) === 5
  ).length

  return {
    isSegmentComplete,
    toggleSegment,
    markSegmentComplete,
    getDayProgress,
    totalCompleted,
    daysFullyCompleted,
    loaded,
  }
}
