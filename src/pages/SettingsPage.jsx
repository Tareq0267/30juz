import { MALAYSIA_STATES } from '../data/malaysiaStates'
import { useFontSize } from '../hooks/useFontSize'
import FontSizeSlider from '../components/FontSizeSlider'

export default function SettingsPage({ prayerData }) {
  const { selectedState, locationSource, changeState, retryGPS, loading } = prayerData
  const { fontSize, setFontSize, MIN_SIZE, MAX_SIZE } = useFontSize()

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-black-forest dark:text-cornsilk">Settings</h1>

      <div className="space-y-3">
        {/* Location */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-olive-leaf/10 dark:border-gray-700">
          <label className="block text-sm font-medium text-black-forest dark:text-cornsilk mb-1">
            Location
          </label>
          <p className="text-xs text-black-forest/50 dark:text-cornsilk/50 mb-3">
            {locationSource === 'gps'
              ? 'Using your GPS location'
              : selectedState
                ? `Using ${selectedState.name} prayer times`
                : 'Detecting location...'}
          </p>

          <select
            value={selectedState?.code || ''}
            onChange={(e) => changeState(e.target.value)}
            disabled={loading}
            className="w-full rounded-xl border border-olive-leaf/20 dark:border-gray-600 bg-cornsilk dark:bg-gray-700 text-black-forest dark:text-cornsilk px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sunlit-clay/50 transition-colors"
          >
            <option value="" disabled>
              Select your state
            </option>
            {MALAYSIA_STATES.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name} — {state.city}
              </option>
            ))}
          </select>

          <button
            onClick={retryGPS}
            disabled={loading}
            className="mt-2 w-full text-xs text-olive-leaf dark:text-sunlit-clay py-2 rounded-xl hover:bg-olive-leaf/5 dark:hover:bg-sunlit-clay/10 transition-colors disabled:opacity-50"
          >
            {loading ? 'Detecting...' : 'Use GPS instead'}
          </button>
        </div>

        {/* Ramadhan Day Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-olive-leaf/10 dark:border-gray-700">
          <label className="block text-sm font-medium text-black-forest dark:text-cornsilk mb-2">
            Ramadhan Day
          </label>
          <p className="text-xs text-black-forest/50 dark:text-cornsilk/50">
            Manual day selector coming in Phase 4.
          </p>
        </div>

        {/* Font Size */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-olive-leaf/10 dark:border-gray-700">
          <label className="block text-sm font-medium text-black-forest dark:text-cornsilk mb-2">
            Arabic Font Size
          </label>
          <p className="text-xs text-black-forest/50 dark:text-cornsilk/50 mb-3">
            Adjust the size of Arabic Uthmani script in the reader.
          </p>
          <FontSizeSlider
            fontSize={fontSize}
            setFontSize={setFontSize}
            min={MIN_SIZE}
            max={MAX_SIZE}
          />
          <p className="font-uthmani text-center mt-3 text-black-forest dark:text-cornsilk" style={{ fontSize: `${fontSize}px` }}>
            بِسْمِ ٱللَّهِ
          </p>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-olive-leaf/10 dark:border-gray-700">
          <label className="block text-sm font-medium text-black-forest dark:text-cornsilk mb-2">
            Notifications
          </label>
          <p className="text-xs text-black-forest/50 dark:text-cornsilk/50">
            Notification permissions & scheduling coming in Phase 5.
          </p>
        </div>
      </div>
    </div>
  )
}
