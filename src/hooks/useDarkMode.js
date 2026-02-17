import { useState, useEffect } from 'react'
import { getSetting, setSetting } from '../db/db'

export function useDarkMode() {
  const [dark, setDark] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getSetting('darkMode').then((value) => {
      const isDark = value ?? window.matchMedia('(prefers-color-scheme: dark)').matches
      setDark(isDark)
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (!loaded) return
    document.documentElement.classList.toggle('dark', dark)
    setSetting('darkMode', dark)
  }, [dark, loaded])

  const toggle = () => setDark((prev) => !prev)

  return { dark, toggle, loaded }
}
