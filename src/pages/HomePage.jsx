import { Link } from 'react-router-dom'
import { getTimeUntil } from '../services/prayerService'
import { getJuzForDay, PRAYER_DISPLAY } from '../data/juzSplit'

const PRAYER_ICONS = {
  Fajr: '🌅',
  Dhuhr: '☀️',
  Asr: '🌤️',
  Maghrib: '🌇',
  Isha: '🌙',
}

export default function HomePage({ prayerData, ramadhanDay, progress }) {
  const { prayers, currentPrayer, loading, error, PRAYER_KEYS, locationSource, selectedState } =
    prayerData
  const { day } = ramadhanDay
  const { isSegmentComplete, getDayProgress, daysFullyCompleted } = progress
  const juzInfo = getJuzForDay(day)
  const dayProgress = getDayProgress(day)

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-black-forest dark:bg-gray-800 text-cornsilk rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-1">Ramadhan Mubarak</h1>
        <p className="text-cornsilk/70 text-sm">
          Day {day} of 30 — Juz {day}
        </p>
        <p className="text-cornsilk/50 text-xs mt-0.5">{juzInfo.label}</p>
        <div className="mt-4 w-full bg-cornsilk/20 rounded-full h-2">
          <div
            className="bg-sunlit-clay h-2 rounded-full transition-all duration-500"
            style={{ width: `${(daysFullyCompleted / 30) * 100}%` }}
          />
        </div>
        <p className="text-xs text-cornsilk/50 mt-1">
          {daysFullyCompleted}/30 Juz completed · {dayProgress}/5 today
        </p>
      </div>

      {/* Prayer Times Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-olive-leaf/10 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-black-forest dark:text-cornsilk">
            Solat Time
          </h2>
          <span className="text-xs text-black-forest/40 dark:text-cornsilk/40">
            {locationSource === 'gps'
              ? 'GPS'
              : selectedState
                ? selectedState.name
                : 'Loading...'}
          </span>
        </div>

        {loading && (
          <div className="flex gap-2 justify-center py-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-14 h-16 rounded-xl bg-cornsilk dark:bg-gray-700 animate-pulse"
              />
            ))}
          </div>
        )}

        {error && (
          <p className="text-xs text-red-500 text-center py-2">{error}</p>
        )}

        {prayers && (
          <div className="flex gap-2">
            {PRAYER_KEYS.map((key) => {
              const isCurrent = currentPrayer?.current === key
              const isNext = currentPrayer?.next === key
              const timeUntil = isNext ? getTimeUntil(prayers[key]) : null

              return (
                <div
                  key={key}
                  className={`flex-1 text-center py-2 px-1 rounded-xl transition-all duration-300 ${
                    isCurrent
                      ? 'bg-olive-leaf text-cornsilk shadow-md'
                      : isNext
                        ? 'bg-sunlit-clay/15 dark:bg-sunlit-clay/10 ring-1 ring-sunlit-clay/30'
                        : 'bg-cornsilk dark:bg-gray-700'
                  }`}
                >
                  <span className="block text-sm">{PRAYER_ICONS[key]}</span>
                  <span className="block text-[10px] font-medium text-black-forest/70 dark:text-cornsilk/70 mt-0.5">
                    {PRAYER_DISPLAY[key]}
                  </span>
                  <span
                    className={`block text-xs font-bold mt-0.5 ${
                      isCurrent ? 'text-cornsilk' : 'text-black-forest dark:text-cornsilk'
                    }`}
                  >
                    {prayers[key]}
                  </span>
                  {timeUntil && (
                    <span className="block text-[9px] text-sunlit-clay font-medium mt-0.5">
                      in {timeUntil}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Today's Segments */}
      <div>
        <h2 className="text-lg font-semibold text-black-forest dark:text-cornsilk mb-3">
          Today's Reading
        </h2>
        <div className="space-y-2">
          {PRAYER_KEYS.map((prayer, i) => {
            const isCurrent = currentPrayer?.current === prayer
            const done = isSegmentComplete(day, prayer)
            return (
              <Link
                key={prayer}
                to={`/reader/${day}?segment=${i + 1}`}
                className={`flex items-center justify-between rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border ${
                  done
                    ? 'bg-olive-leaf/5 dark:bg-olive-leaf/10 border-olive-leaf/20 dark:border-olive-leaf/30'
                    : isCurrent
                      ? 'bg-sunlit-clay/5 dark:bg-sunlit-clay/5 border-sunlit-clay/30 dark:border-sunlit-clay/20'
                      : 'bg-white dark:bg-gray-800 border-olive-leaf/10 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                      done
                        ? 'bg-olive-leaf text-cornsilk'
                        : isCurrent
                          ? 'bg-sunlit-clay/20 dark:bg-sunlit-clay/10'
                          : 'bg-olive-leaf/10 dark:bg-olive-leaf/20'
                    }`}
                  >
                    {done ? '✓' : PRAYER_ICONS[prayer]}
                  </span>
                  <div>
                    <p className="font-medium text-black-forest dark:text-cornsilk">
                      {PRAYER_DISPLAY[prayer]}
                      {isCurrent && !done && (
                        <span className="ml-2 text-xs text-sunlit-clay font-normal">
                          Now
                        </span>
                      )}
                      {done && (
                        <span className="ml-2 text-xs text-olive-leaf dark:text-olive-leaf/80 font-normal">
                          Done
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-black-forest/50 dark:text-cornsilk/50">
                      Segment {i + 1} of Juz {day}
                      {prayers ? ` · ${prayers[prayer]}` : ''}
                    </p>
                  </div>
                </div>
                <span className={`text-sm ${done ? 'text-olive-leaf' : 'text-copperwood'}`}>
                  {done ? 'Review →' : 'Start →'}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
