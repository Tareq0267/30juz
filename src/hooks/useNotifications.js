import { useState, useEffect, useCallback } from 'react'
import { getSetting, setSetting } from '../db/db'
import {
  isNotificationSupported,
  isIOS,
  isStandalone,
  requestPermission,
  getPermissionState,
  sendPrayerTimesToSW,
  toggleSWNotifications,
} from '../utils/notifications'

export function useNotifications(prayers, dayNumber) {
  const [permission, setPermission] = useState('default')
  const [enabled, setEnabled] = useState(false)
  const [supported, setSupported] = useState(true)
  const [iosWarning, setIosWarning] = useState(false)

  // Init: check support and load saved preference
  useEffect(() => {
    const sup = isNotificationSupported()
    setSupported(sup)
    setIosWarning(isIOS())

    if (sup) {
      setPermission(getPermissionState())
    }

    getSetting('notificationsEnabled').then((val) => {
      if (val && sup && getPermissionState() === 'granted') {
        setEnabled(true)
      }
    })
  }, [])

  // Sync prayer times to SW whenever they change
  useEffect(() => {
    if (enabled && prayers) {
      sendPrayerTimesToSW(prayers, dayNumber)
      toggleSWNotifications(true)
    }
  }, [enabled, prayers, dayNumber])

  const enable = useCallback(async () => {
    if (!supported) return

    let perm = getPermissionState()
    if (perm !== 'granted') {
      perm = await requestPermission()
      setPermission(perm)
    }

    if (perm === 'granted') {
      setEnabled(true)
      await setSetting('notificationsEnabled', true)
      if (prayers) {
        await sendPrayerTimesToSW(prayers, dayNumber)
        await toggleSWNotifications(true)
      }
    }
  }, [supported, prayers, dayNumber])

  const disable = useCallback(async () => {
    setEnabled(false)
    await setSetting('notificationsEnabled', false)
    await toggleSWNotifications(false)
  }, [])

  const toggle = useCallback(async () => {
    if (enabled) {
      await disable()
    } else {
      await enable()
    }
  }, [enabled, enable, disable])

  return {
    permission,
    enabled,
    supported,
    iosWarning,
    isStandalone: isStandalone(),
    toggle,
    enable,
    disable,
  }
}
