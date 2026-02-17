import { useState, useEffect, useCallback } from 'react'
import { fetchPrayerTimes, getCurrentPrayer, PRAYER_KEYS } from '../services/prayerService'
import { getSetting, setSetting } from '../db/db'
import { getUserLocation } from '../utils/geolocation'
import { DEFAULT_STATE, MALAYSIA_STATES } from '../data/malaysiaStates'

export function usePrayerTimes() {
  const [prayers, setPrayers] = useState(null)
  const [currentPrayer, setCurrentPrayer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [locationSource, setLocationSource] = useState(null) // 'gps' | 'manual'
  const [selectedState, setSelectedState] = useState(null)

  const loadPrayerTimes = useCallback(async (lat, lng, source) => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchPrayerTimes(lat, lng)
      setPrayers(data.prayers)
      setCurrentPrayer(getCurrentPrayer(data.prayers))
      setLocationSource(source)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load: try saved state first, then GPS, then default
  useEffect(() => {
    async function init() {
      // Check if user has a saved state preference
      const savedCode = await getSetting('selectedState')
      if (savedCode) {
        const state = MALAYSIA_STATES.find((s) => s.code === savedCode)
        if (state) {
          setSelectedState(state)
          await loadPrayerTimes(state.lat, state.lng, 'manual')
          return
        }
      }

      // Try GPS
      try {
        const coords = await getUserLocation()
        await loadPrayerTimes(coords.lat, coords.lng, 'gps')
        return
      } catch {
        // GPS failed — fall back to default (KL)
      }

      setSelectedState(DEFAULT_STATE)
      await loadPrayerTimes(DEFAULT_STATE.lat, DEFAULT_STATE.lng, 'manual')
    }

    init()
  }, [loadPrayerTimes])

  // Update current prayer indicator every minute
  useEffect(() => {
    if (!prayers) return

    const interval = setInterval(() => {
      setCurrentPrayer(getCurrentPrayer(prayers))
    }, 60_000)

    return () => clearInterval(interval)
  }, [prayers])

  // Change state manually
  const changeState = useCallback(
    async (stateCode) => {
      const state = MALAYSIA_STATES.find((s) => s.code === stateCode)
      if (!state) return

      setSelectedState(state)
      await setSetting('selectedState', stateCode)
      await loadPrayerTimes(state.lat, state.lng, 'manual')
    },
    [loadPrayerTimes]
  )

  // Retry with GPS
  const retryGPS = useCallback(async () => {
    try {
      const coords = await getUserLocation()
      setSelectedState(null)
      await setSetting('selectedState', null)
      await loadPrayerTimes(coords.lat, coords.lng, 'gps')
    } catch (err) {
      setError('GPS unavailable. Please select your state manually.')
    }
  }, [loadPrayerTimes])

  return {
    prayers,
    currentPrayer,
    loading,
    error,
    locationSource,
    selectedState,
    changeState,
    retryGPS,
    PRAYER_KEYS,
  }
}
