import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { useDarkMode } from './hooks/useDarkMode'
import { usePrayerTimes } from './hooks/usePrayerTimes'
import HomePage from './pages/HomePage'
import ReaderPage from './pages/ReaderPage'
import ProgressPage from './pages/ProgressPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  const { dark, toggle, loaded } = useDarkMode()
  const prayerData = usePrayerTimes()

  if (!loaded) return null

  return (
    <Layout dark={dark} onToggleDark={toggle}>
      <Routes>
        <Route path="/" element={<HomePage prayerData={prayerData} />} />
        <Route path="/reader" element={<ReaderPage />} />
        <Route path="/reader/:juz" element={<ReaderPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/settings" element={<SettingsPage prayerData={prayerData} />} />
      </Routes>
    </Layout>
  )
}
