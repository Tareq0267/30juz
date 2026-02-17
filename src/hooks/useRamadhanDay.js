import { useState, useEffect, useCallback } from 'react'
import { getSetting, setSetting } from '../db/db'

// Default Ramadhan start: 19 February 2026
const RAMADHAN_START = new Date(2026, 1, 19) // Month is 0-indexed

function calculateAutoDay() {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const start = new Date(RAMADHAN_START)
  start.setHours(0, 0, 0, 0)

  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  // Day 1 on start date, clamp to 1-30
  const day = diff + 1
  return Math.max(1, Math.min(30, day))
}

export function useRamadhanDay() {
  const [day, setDay] = useState(1)
  const [isManual, setIsManual] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function init() {
      const savedDay = await getSetting('ramadhanDay')
      const savedManual = await getSetting('ramadhanDayManual')

      if (savedManual && savedDay) {
        setDay(savedDay)
        setIsManual(true)
      } else {
        setDay(calculateAutoDay())
        setIsManual(false)
      }
      setLoaded(true)
    }
    init()
  }, [])

  const setManualDay = useCallback(async (newDay) => {
    const clamped = Math.max(1, Math.min(30, newDay))
    setDay(clamped)
    setIsManual(true)
    await setSetting('ramadhanDay', clamped)
    await setSetting('ramadhanDayManual', true)
  }, [])

  const resetToAuto = useCallback(async () => {
    const autoDay = calculateAutoDay()
    setDay(autoDay)
    setIsManual(false)
    await setSetting('ramadhanDay', null)
    await setSetting('ramadhanDayManual', false)
  }, [])

  return { day, isManual, setManualDay, resetToAuto, loaded }
}
