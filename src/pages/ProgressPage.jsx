import { useState } from 'react'
import { Link } from 'react-router-dom'
import { JUZ_DATA, PRAYER_SEGMENTS, PRAYER_DISPLAY } from '../data/juzSplit'
import { T } from '../i18n/translations'

export default function ProgressPage({ ramadhanDay, progress, language }) {
  const t = T[language] ?? T.ms
  const { day } = ramadhanDay
  const { getDayProgress, isSegmentComplete, toggleSegment, totalCompleted, daysFullyCompleted } =
    progress
  const [selectedDay, setSelectedDay] = useState(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-black-forest dark:text-cornsilk">{t.yourProgress}</h1>
        <div className="text-right">
          <p className="text-sm font-medium text-black-forest dark:text-cornsilk">
            {totalCompleted}/150
          </p>
          <p className="text-xs text-black-forest/50 dark:text-cornsilk/50">{t.segmentsDone}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex gap-2">
        <div className="flex-1 bg-olive-leaf/10 dark:bg-olive-leaf/20 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-olive-leaf">{daysFullyCompleted}</p>
          <p className="text-[10px] text-olive-leaf/70">{t.daysComplete}</p>
        </div>
        <div className="flex-1 bg-sunlit-clay/10 dark:bg-sunlit-clay/10 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-sunlit-clay">{totalCompleted}</p>
          <p className="text-[10px] text-sunlit-clay/70">{t.segmentsRead}</p>
        </div>
        <div className="flex-1 bg-copperwood/10 dark:bg-copperwood/10 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-copperwood">
            {Math.round((totalCompleted / 150) * 100)}%
          </p>
          <p className="text-[10px] text-copperwood/70">{t.overall}</p>
        </div>
      </div>

      {/* 30-day grid */}
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: 30 }, (_, i) => {
          const d = i + 1
          const prog = getDayProgress(d)
          const isToday = d === day
          const isSelected = d === selectedDay
          const isComplete = prog === 5

          return (
            <button
              key={d}
              onClick={() => setSelectedDay(isSelected ? null : d)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium shadow-sm transition-all duration-200 border ${
                isComplete
                  ? 'bg-olive-leaf text-cornsilk border-olive-leaf'
                  : isToday
                    ? 'bg-sunlit-clay/15 dark:bg-sunlit-clay/10 border-sunlit-clay/40 text-black-forest dark:text-cornsilk'
                    : isSelected
                      ? 'bg-white dark:bg-gray-700 border-olive-leaf/40 dark:border-olive-leaf/40 text-black-forest dark:text-cornsilk'
                      : 'bg-white dark:bg-gray-800 border-olive-leaf/10 dark:border-gray-700 text-black-forest/60 dark:text-cornsilk/60'
              }`}
            >
              <span className="text-xs font-bold">{d}</span>
              {prog > 0 && !isComplete && (
                <span className="text-[8px] text-olive-leaf dark:text-olive-leaf/80 mt-0.5">
                  {prog}/5
                </span>
              )}
              {isComplete && <span className="text-[8px] mt-0.5">✓</span>}
            </button>
          )
        })}
      </div>

      {/* Day detail panel */}
      {selectedDay && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-olive-leaf/10 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-black-forest dark:text-cornsilk">
                {t.dayJuz(selectedDay)}
              </h3>
              <p className="text-xs text-black-forest/50 dark:text-cornsilk/50">
                {JUZ_DATA[selectedDay - 1].label}
              </p>
            </div>
            <Link
              to={`/reader/${selectedDay}?segment=1`}
              className="text-xs text-copperwood hover:underline"
            >
              {t.openReader}
            </Link>
          </div>

          <div className="space-y-1.5">
            {PRAYER_SEGMENTS.map((seg) => {
              const done = isSegmentComplete(selectedDay, seg.prayer)
              return (
                <button
                  key={seg.prayer}
                  onClick={() => toggleSegment(selectedDay, seg.prayer)}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-xl text-sm transition-all ${
                    done
                      ? 'bg-olive-leaf/10 dark:bg-olive-leaf/20 text-olive-leaf'
                      : 'bg-cornsilk dark:bg-gray-700 text-black-forest/60 dark:text-cornsilk/60'
                  }`}
                >
                  <span>{t.segmentLabel(PRAYER_DISPLAY[seg.prayer], seg.index + 1)}</span>
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                    done
                      ? 'bg-olive-leaf text-cornsilk'
                      : 'border border-olive-leaf/20 dark:border-gray-600'
                  }`}>
                    {done ? '✓' : ''}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Completion message */}
      {daysFullyCompleted === 30 && (
        <div className="bg-olive-leaf text-cornsilk rounded-2xl p-6 text-center shadow-lg">
          <p className="text-2xl mb-1">Alhamdulillah!</p>
          <p className="text-sm text-cornsilk/80">
            {t.khatamMessage}
          </p>
        </div>
      )}
    </div>
  )
}
