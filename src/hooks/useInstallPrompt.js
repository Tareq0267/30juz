import { useState, useEffect } from 'react'

// Capture the event early, before React mounts
let earlyPromptEvent = null
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  earlyPromptEvent = e
})

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true)
      return
    }

    // Pick up event that fired before React mounted
    if (earlyPromptEvent) {
      setDeferredPrompt(earlyPromptEvent)
      earlyPromptEvent = null
    }

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    const installedHandler = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', installedHandler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', installedHandler)
    }
  }, [])

  const install = async () => {
    if (!deferredPrompt) return false
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    setDeferredPrompt(null)
    return outcome === 'accepted'
  }

  const dismiss = () => setDeferredPrompt(null)

  return {
    canInstall: !!deferredPrompt && !isInstalled,
    isInstalled,
    install,
    dismiss,
  }
}
