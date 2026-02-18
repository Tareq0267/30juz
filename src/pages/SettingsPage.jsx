import { MALAYSIA_STATES } from '../data/malaysiaStates'
import { useFontSize } from '../hooks/useFontSize'
import FontSizeSlider from '../components/FontSizeSlider'

export default function SettingsPage({ prayerData, ramadhanDay, notifications }) {
  const { selectedState, locationSource, changeState, retryGPS, loading } = prayerData
  const { day, isManual, setManualDay, resetToAuto } = ramadhanDay
  const { fontSize, setFontSize, MIN_SIZE, MAX_SIZE } = useFontSize()
  const { permission, enabled, supported, iosWarning, isStandalone: isPWA, toggle: toggleNotif } = notifications

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-black-forest dark:text-cornsilk">Settings</h1>

      <div className="space-y-3">
        {/* Ramadhan Day Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-olive-leaf/10 dark:border-gray-700">
          <label className="block text-sm font-medium text-black-forest dark:text-cornsilk mb-1">
            Ramadhan Day
          </label>
          <p className="text-xs text-black-forest/50 dark:text-cornsilk/50 mb-3">
            {isManual
              ? `Manually set to Day ${day}`
              : `Auto-calculated: Day ${day} (from 19 Feb 2026)`}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setManualDay(Math.max(1, day - 1))}
              disabled={day <= 1}
              className="w-10 h-10 rounded-xl bg-cornsilk dark:bg-gray-700 border border-olive-leaf/10 dark:border-gray-600 text-black-forest dark:text-cornsilk font-bold disabled:opacity-30 hover:border-olive-leaf/30 transition-colors"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <span className="text-3xl font-bold text-black-forest dark:text-cornsilk">{day}</span>
              <span className="text-sm text-black-forest/40 dark:text-cornsilk/40"> / 30</span>
            </div>
            <button
              onClick={() => setManualDay(Math.min(30, day + 1))}
              disabled={day >= 30}
              className="w-10 h-10 rounded-xl bg-cornsilk dark:bg-gray-700 border border-olive-leaf/10 dark:border-gray-600 text-black-forest dark:text-cornsilk font-bold disabled:opacity-30 hover:border-olive-leaf/30 transition-colors"
            >
              +
            </button>
          </div>

          {/* Quick select grid */}
          <div className="grid grid-cols-10 gap-1 mt-3">
            {Array.from({ length: 30 }, (_, i) => (
              <button
                key={i}
                onClick={() => setManualDay(i + 1)}
                className={`aspect-square rounded-lg text-[10px] font-medium transition-all ${
                  day === i + 1
                    ? 'bg-olive-leaf text-cornsilk'
                    : 'bg-cornsilk dark:bg-gray-700 text-black-forest/60 dark:text-cornsilk/60 hover:bg-olive-leaf/10'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {isManual && (
            <button
              onClick={resetToAuto}
              className="mt-2 w-full text-xs text-olive-leaf dark:text-sunlit-clay py-2 rounded-xl hover:bg-olive-leaf/5 dark:hover:bg-sunlit-clay/10 transition-colors"
            >
              Reset to auto-detect
            </button>
          )}
        </div>

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
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-black-forest dark:text-cornsilk">
              Prayer Reminders
            </label>
            {supported && permission !== 'denied' && (
              <button
                onClick={toggleNotif}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  enabled ? 'bg-olive-leaf' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300"
                  style={{ transform: enabled ? 'translateX(24px)' : 'translateX(0)' }}
                />
              </button>
            )}
          </div>

          {/* Status */}
          {!supported && (
            <p className="text-xs text-red-500">
              Notifications are not supported in this browser.
            </p>
          )}

          {supported && permission === 'denied' && (
            <p className="text-xs text-red-500">
              Notification permission was denied. Please enable it in your browser settings.
            </p>
          )}

          {supported && permission !== 'denied' && (
            <p className="text-xs text-black-forest/50 dark:text-cornsilk/50">
              {enabled
                ? 'You will receive reminders at each prayer time with your Juz reading segment.'
                : 'Enable to get reminders at each prayer time to continue your Quran reading.'}
            </p>
          )}

          {/* iOS Warning */}
          {iosWarning && (
            <div className="mt-3 bg-sunlit-clay/10 dark:bg-sunlit-clay/5 rounded-xl p-3 border border-sunlit-clay/20">
              <p className="text-xs font-medium text-copperwood mb-1">
                iPhone / iPad Notice
              </p>
              <p className="text-[11px] text-copperwood/80 leading-relaxed">
                {isPWA ? (
                  <>
                    Notifications work when the app is open. iOS may pause background checks
                    when the app is minimized. For best results, keep the app open during prayer times.
                  </>
                ) : (
                  <>
                    For notifications to work on iOS, you must <strong>install this app to your Home Screen</strong> first.
                    Tap the Share button, then "Add to Home Screen". Notifications only work in installed PWAs on iOS 16.4+.
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
