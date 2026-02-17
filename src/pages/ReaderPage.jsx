import { useState, useEffect, useRef } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useQuranData } from '../hooks/useQuranData'
import { useHighlights } from '../hooks/useHighlights'
import { useFontSize } from '../hooks/useFontSize'
import AyahCard from '../components/AyahCard'
import FontSizeSlider from '../components/FontSizeSlider'
import SegmentTabs from '../components/SegmentTabs'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function ReaderPage() {
  const { juz } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const juzNumber = Number(juz) || 1
  const initialSegment = Number(searchParams.get('segment')) - 1 || 0

  const { segments, loading, error, reload } = useQuranData(juzNumber)
  const { isHighlighted, toggleHighlight } = useHighlights()
  const { fontSize, setFontSize, MIN_SIZE, MAX_SIZE } = useFontSize()

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
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-olive-leaf/10 dark:border-gray-700 text-center">
          <p className="font-uthmani text-3xl text-black-forest dark:text-cornsilk mb-4">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </p>
          <p className="text-sm text-black-forest/60 dark:text-cornsilk/60 mb-4">
            Select a Juz from the home page to begin reading.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-olive-leaf text-cornsilk px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-olive-leaf/90 transition-colors"
          >
            Go to Home
          </button>
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
              {currentAyahs.length} ayahs in this segment
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
          />
          <FontSizeSlider
            fontSize={fontSize}
            setFontSize={setFontSize}
            min={MIN_SIZE}
            max={MAX_SIZE}
          />
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
            />
          ))}

          {/* Next segment / Juz nav */}
          {currentAyahs.length > 0 && (
            <div className="flex gap-2 pt-4 pb-8">
              {activeSegment < segments.length - 1 ? (
                <button
                  onClick={() => setActiveSegment((s) => s + 1)}
                  className="flex-1 bg-olive-leaf text-cornsilk py-3 rounded-2xl font-medium text-sm hover:bg-olive-leaf/90 transition-colors shadow-sm"
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
          )}
        </div>
      )}
    </div>
  )
}
