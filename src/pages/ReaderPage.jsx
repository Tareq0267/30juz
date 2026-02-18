import { useState, useEffect, useRef } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useQuranData } from '../hooks/useQuranData'
import { useHighlights } from '../hooks/useHighlights'
import { useFontSize } from '../hooks/useFontSize'
import { useTranslationToggle } from '../hooks/useTranslationToggle'
import AyahCard from '../components/AyahCard'
import FontSizeSlider from '../components/FontSizeSlider'
import SegmentTabs from '../components/SegmentTabs'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { PRAYER_SEGMENTS } from '../data/juzSplit'

export default function ReaderPage({ progress, ramadhanDay }) {
  const { markSegmentComplete, isSegmentComplete } = progress
  const { juz } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const juzNumber = Number(juz) || 1
  const initialSegment = Number(searchParams.get('segment')) - 1 || 0

  const { segments, loading, error, reload } = useQuranData(juzNumber)
  const { isHighlighted, toggleHighlight } = useHighlights()
  const { fontSize, setFontSize, MIN_SIZE, MAX_SIZE } = useFontSize()
  const { showMalay, setShowMalay, showEnglish, setShowEnglish } = useTranslationToggle()

  const [activeSegment, setActiveSegment] = useState(initialSegment)
  const [showControls, setShowControls] = useState(true)
  const topRef = useRef(null)

  // Clamp activeSegment when segments load
  useEffect(() => {
    if (segments.length > 0 && activeSegment >= segments.length) {
      setActiveSegment(0)
    }
  }, [segments, activeSegment])

  // Scroll to top when segment changes
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeSegment])

  const currentAyahs = segments[activeSegment] || []

  // Detect surah boundaries for headers
  function shouldShowSurahHeader(ayah, index) {
    if (index === 0) return true
    const prev = currentAyahs[index - 1]
    return ayah.surahNumber !== prev.surahNumber
  }

  if (!juz) {
    const todayJuz = ramadhanDay?.day || 1
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-olive-leaf/10 dark:border-gray-700 text-center">
          <p className="font-uthmani text-3xl text-black-forest dark:text-cornsilk mb-4">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </p>
          <button
            onClick={() => navigate(`/reader/${todayJuz}?segment=1`)}
            className="bg-olive-leaf text-cornsilk px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-olive-leaf/90 transition-colors w-full"
          >
            Continue Today's Juz — Juz {todayJuz}
          </button>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-black-forest dark:text-cornsilk mb-3">
            All 30 Juz
          </h2>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 30 }, (_, i) => {
              const n = i + 1
              const dayProgress = progress.getDayProgress(n)
              const isToday = n === todayJuz
              const isComplete = dayProgress === 5
              return (
                <button
                  key={n}
                  onClick={() => navigate(`/reader/${n}?segment=1`)}
                  className={`relative py-3 rounded-xl text-sm font-medium transition-all ${
                    isToday
                      ? 'bg-sunlit-clay text-black-forest shadow-md ring-2 ring-sunlit-clay/50'
                      : isComplete
                        ? 'bg-olive-leaf/15 dark:bg-olive-leaf/20 text-olive-leaf'
                        : 'bg-cornsilk dark:bg-gray-700 text-black-forest/70 dark:text-cornsilk/70 hover:bg-sunlit-clay/10'
                  }`}
                >
                  {n}
                  {isComplete && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-olive-leaf text-cornsilk rounded-full text-[9px] flex items-center justify-center">
                      ✓
                    </span>
                  )}
                  {dayProgress > 0 && !isComplete && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {Array.from({ length: dayProgress }, (_, j) => (
                        <span key={j} className="w-1 h-1 rounded-full bg-sunlit-clay" />
                      ))}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          <p className="text-[10px] text-black-forest/40 dark:text-cornsilk/40 mt-2 text-center">
            Dots = segments completed · ✓ = all 5 segments done
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4" ref={topRef}>
      {/* Juz header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-black-forest dark:text-cornsilk">
            Juz {juzNumber}
          </h1>
          {currentAyahs.length > 0 && (
            <p className="text-xs text-black-forest/50 dark:text-cornsilk/50">
              {currentAyahs.length} ayat in this segment
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Juz navigation */}
          <button
            disabled={juzNumber <= 1}
            onClick={() => navigate(`/reader/${juzNumber - 1}?segment=1`)}
            className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-olive-leaf/10 dark:border-gray-700 text-black-forest/60 dark:text-cornsilk/60 flex items-center justify-center disabled:opacity-30 hover:border-olive-leaf/30 transition-colors"
          >
            ‹
          </button>
          <button
            disabled={juzNumber >= 30}
            onClick={() => navigate(`/reader/${juzNumber + 1}?segment=1`)}
            className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-olive-leaf/10 dark:border-gray-700 text-black-forest/60 dark:text-cornsilk/60 flex items-center justify-center disabled:opacity-30 hover:border-olive-leaf/30 transition-colors"
          >
            ›
          </button>

          {/* Toggle controls */}
          <button
            onClick={() => setShowControls((v) => !v)}
            className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-olive-leaf/10 dark:border-gray-700 text-black-forest/60 dark:text-cornsilk/60 flex items-center justify-center hover:border-olive-leaf/30 transition-colors text-sm"
          >
            {showControls ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {/* Controls panel */}
      {showControls && (
        <div className="space-y-3">
          <SegmentTabs
            activeSegment={activeSegment}
            onChangeSegment={setActiveSegment}
            segmentCount={segments.length}
            completedSegments={new Set(
              PRAYER_SEGMENTS.filter((s) => isSegmentComplete(juzNumber, s.prayer)).map((s) => s.prayer)
            )}
          />
          <FontSizeSlider
            fontSize={fontSize}
            setFontSize={setFontSize}
            min={MIN_SIZE}
            max={MAX_SIZE}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowEnglish((v) => !v)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all border ${
                showEnglish
                  ? 'bg-olive-leaf/10 dark:bg-olive-leaf/20 border-olive-leaf/30 text-olive-leaf'
                  : 'bg-white dark:bg-gray-800 border-olive-leaf/10 dark:border-gray-700 text-black-forest/40 dark:text-cornsilk/40'
              }`}
            >
              {showEnglish ? '✓ ' : ''}English
            </button>
            <button
              onClick={() => setShowMalay((v) => !v)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all border ${
                showMalay
                  ? 'bg-olive-leaf/10 dark:bg-olive-leaf/20 border-olive-leaf/30 text-olive-leaf'
                  : 'bg-white dark:bg-gray-800 border-olive-leaf/10 dark:border-gray-700 text-black-forest/40 dark:text-cornsilk/40'
              }`}
            >
              {showMalay ? '✓ ' : ''}Melayu
            </button>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 text-center border border-red-200 dark:border-red-800/30">
          <p className="text-sm text-red-600 dark:text-red-400 mb-2">{error}</p>
          <button
            onClick={reload}
            className="text-xs text-red-500 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && <LoadingSkeleton count={6} />}

      {/* Ayah list */}
      {!loading && !error && (
        <div className="space-y-3">
          {currentAyahs.map((ayah, i) => (
            <AyahCard
              key={ayah.number}
              ayah={ayah}
              fontSize={fontSize}
              isHighlighted={isHighlighted(ayah.number)}
              onToggleHighlight={toggleHighlight}
              showSurahHeader={shouldShowSurahHeader(ayah, i)}
              showEnglish={showEnglish}
              showMalay={showMalay}
            />
          ))}

          {/* Mark complete + navigation */}
          {currentAyahs.length > 0 && (() => {
            const prayerName = PRAYER_SEGMENTS[activeSegment]?.prayer
            const done = prayerName && isSegmentComplete(juzNumber, prayerName)

            return (
              <div className="space-y-2 pt-4 pb-8">
                {/* Mark segment complete */}
                {prayerName && (
                  <button
                    onClick={() => markSegmentComplete(juzNumber, prayerName)}
                    disabled={done}
                    className={`w-full py-3 rounded-2xl font-medium text-sm transition-colors shadow-sm ${
                      done
                        ? 'bg-olive-leaf/10 dark:bg-olive-leaf/20 text-olive-leaf cursor-default'
                        : 'bg-olive-leaf text-cornsilk hover:bg-olive-leaf/90'
                    }`}
                  >
                    {done ? '✓ Segment Complete' : 'Mark as Complete'}
                  </button>
                )}

                {/* Next navigation */}
                <div className="flex gap-2">
                  {activeSegment < segments.length - 1 ? (
                    <button
                      onClick={() => setActiveSegment((s) => s + 1)}
                      className="flex-1 bg-sunlit-clay/15 dark:bg-sunlit-clay/10 text-copperwood py-3 rounded-2xl font-medium text-sm hover:bg-sunlit-clay/25 transition-colors"
                    >
                      Next Segment →
                    </button>
                  ) : juzNumber < 30 ? (
                    <button
                      onClick={() => navigate(`/reader/${juzNumber + 1}?segment=1`)}
                      className="flex-1 bg-sunlit-clay text-black-forest py-3 rounded-2xl font-medium text-sm hover:bg-sunlit-clay/90 transition-colors shadow-sm"
                    >
                      Next Juz →
                    </button>
                  ) : (
                    <div className="flex-1 bg-olive-leaf/10 dark:bg-olive-leaf/20 text-olive-leaf py-3 rounded-2xl font-medium text-sm text-center">
                      End of Quran — Alhamdulillah
                    </div>
                  )}
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
