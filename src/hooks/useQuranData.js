import { useState, useEffect, useCallback } from 'react'
import { fetchJuz, splitIntoSegments } from '../services/quranService'

export function useQuranData(juz) {
  const [ayahs, setAyahs] = useState([])
  const [segments, setSegments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!juz || juz < 1 || juz > 30) return

    try {
      setLoading(true)
      setError(null)
      const data = await fetchJuz(juz)
      setAyahs(data)
      setSegments(splitIntoSegments(data))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [juz])

  useEffect(() => {
    load()
  }, [load])

  return { ayahs, segments, loading, error, reload: load }
}
