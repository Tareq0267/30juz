import { useState, useEffect } from 'react'
import { getSetting, setSetting } from '../db/db'

export function useTranslationToggle() {
  const [showMalay, setShowMalay] = useState(true)
  const [showEnglish, setShowEnglish] = useState(true)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    Promise.all([
      getSetting('showMalay'),
      getSetting('showEnglish'),
    ]).then(([malay, english]) => {
      if (malay !== undefined && malay !== null) setShowMalay(malay)
      if (english !== undefined && english !== null) setShowEnglish(english)
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (!loaded) return
    setSetting('showMalay', showMalay)
  }, [showMalay, loaded])

  useEffect(() => {
    if (!loaded) return
    setSetting('showEnglish', showEnglish)
  }, [showEnglish, loaded])

  return { showMalay, setShowMalay, showEnglish, setShowEnglish }
}
