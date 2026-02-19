import { useState, useEffect } from 'react'
import { getSetting, setSetting } from '../db/db'

export function useLanguage() {
  const [language, setLanguage] = useState('ms')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getSetting('uiLanguage').then((val) => {
      if (val) setLanguage(val)
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (!loaded) return
    setSetting('uiLanguage', language)
  }, [language, loaded])

  return { language, setLanguage, loaded }
}
