export default function AyahCard({
  ayah,
  fontSize,
  isHighlighted,
  onToggleHighlight,
  showSurahHeader,
  showEnglish = true,
  showMalay = true,
}) {
  return (
    <>
      {showSurahHeader && (
        <div className="text-center py-4 my-2">
          <div className="inline-block bg-black-forest dark:bg-gray-700 text-cornsilk px-6 py-2.5 rounded-2xl shadow-md">
            <p className="font-uthmani text-lg">{ayah.surahName}</p>
            <p className="text-xs text-cornsilk/70 mt-0.5">{ayah.surahEnglishName}</p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => onToggleHighlight(ayah.number)}
        className={`w-full text-left rounded-2xl p-4 transition-all duration-200 border ${
          isHighlighted
            ? 'bg-sunlit-clay/10 dark:bg-sunlit-clay/5 border-sunlit-clay/30 dark:border-sunlit-clay/20'
            : 'bg-white dark:bg-gray-800 border-olive-leaf/10 dark:border-gray-700 hover:border-olive-leaf/20 dark:hover:border-gray-600'
        }`}
      >
        {/* Ayah number badge */}
        <div className="flex items-start justify-between mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-olive-leaf/10 dark:bg-olive-leaf/20 text-olive-leaf text-xs font-bold shrink-0">
            {ayah.numberInSurah}
          </span>
          {isHighlighted && (
            <span className="text-xs text-sunlit-clay font-medium">Highlighted</span>
          )}
        </div>

        {/* Arabic text */}
        <p
          className="font-uthmani text-black-forest dark:text-cornsilk mb-4 leading-loose"
          style={{ fontSize: `${fontSize}px` }}
        >
          {ayah.arabic}
        </p>

        {/* English translation */}
        {showEnglish && (
          <p className="text-sm text-black-forest/70 dark:text-cornsilk/70 mb-2 leading-relaxed">
            {ayah.english}
          </p>
        )}

        {/* Malay translation */}
        {showMalay && (
          <p className="text-sm text-olive-leaf dark:text-olive-leaf/80 leading-relaxed italic">
            {ayah.malay}
          </p>
        )}
      </button>
    </>
  )
}
