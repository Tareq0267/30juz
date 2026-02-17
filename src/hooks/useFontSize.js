import { useState, useEffect } from 'react'
import { getSetting, setSetting } from '../db/db'

const DEFAULT_SIZE = 28
const MIN_SIZE = 20
const MAX_SIZE = 48

export function useFontSize() {
  const [fontSize, setFontSize] = useState(DEFAULT_SIZE)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getSetting('arabicFontSize').then((val) => {
      if (val) setFontSize(val)
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (!loaded) return
    setSetting('arabicFontSize', fontSize)
  }, [fontSize, loaded])

  return { fontSize, setFontSize, MIN_SIZE, MAX_SIZE, loaded }
}
