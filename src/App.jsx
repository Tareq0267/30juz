import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import InstallBanner from './components/InstallBanner'
import { useDarkMode } from './hooks/useDarkMode'
import { usePrayerTimes } from './hooks/usePrayerTimes'
import { useRamadhanDay } from './hooks/useRamadhanDay'
import { useProgress } from './hooks/useProgress'
import { useNotifications } from './hooks/useNotifications'
import { useInstallPrompt } from './hooks/useInstallPrompt'
import HomePage from './pages/HomePage'
import ReaderPage from './pages/ReaderPage'
import ProgressPage from './pages/ProgressPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  const { dark, toggle, loaded } = useDarkMode()
  const prayerData = usePrayerTimes()
  const ramadhanDay = useRamadhanDay()
  const progress = useProgress()
  const notifications = useNotifications(prayerData.prayers, ramadhanDay.day)
  const installPrompt = useInstallPrompt()

  if (!loaded || !ramadhanDay.loaded || !progress.loaded) return null

  return (
    <Layout dark={dark} onToggleDark={toggle}>
      <Routes>
        <Route path="/" element={<HomePage prayerData={prayerData} ramadhanDay={ramadhanDay} progress={progress} />} />
        <Route path="/reader" element={<ReaderPage progress={progress} ramadhanDay={ramadhanDay} />} />
        <Route path="/reader/:juz" element={<ReaderPage progress={progress} ramadhanDay={ramadhanDay} />} />
        <Route path="/progress" element={<ProgressPage ramadhanDay={ramadhanDay} progress={progress} />} />
        <Route path="/settings" element={<SettingsPage prayerData={prayerData} ramadhanDay={ramadhanDay} notifications={notifications} />} />
      </Routes>
      {installPrompt.canInstall && (
        <InstallBanner onInstall={installPrompt.install} onDismiss={installPrompt.dismiss} />
      )}
    </Layout>
  )
}
