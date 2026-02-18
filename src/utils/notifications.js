// Detect iOS
export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

// Detect if running as installed PWA
export function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
}

// Check if Notification API is available
export function isNotificationSupported() {
  return 'Notification' in window && 'serviceWorker' in navigator
}

// Request notification permission
export async function requestPermission() {
  if (!isNotificationSupported()) {
    return 'unsupported'
  }
  const result = await Notification.requestPermission()
  return result // 'granted' | 'denied' | 'default'
}

// Get current permission state
export function getPermissionState() {
  if (!isNotificationSupported()) return 'unsupported'
  return Notification.permission // 'granted' | 'denied' | 'default'
}

// Send prayer times to service worker for scheduling
export async function sendPrayerTimesToSW(prayers, dayNumber) {
  const reg = await navigator.serviceWorker?.ready
  if (!reg?.active) return false

  reg.active.postMessage({
    type: 'UPDATE_PRAYER_TIMES',
    prayers,
    dayNumber,
  })
  return true
}

// Tell SW to enable/disable notifications
export async function toggleSWNotifications(enabled) {
  const reg = await navigator.serviceWorker?.ready
  if (!reg?.active) return false

  reg.active.postMessage({
    type: 'TOGGLE_NOTIFICATIONS',
    enabled,
  })
  return true
}
