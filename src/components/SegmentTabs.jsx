const PRAYER_LABELS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

export default function SegmentTabs({ activeSegment, onChangeSegment, segmentCount }) {
  return (
    <div className="flex gap-1 bg-white dark:bg-gray-800 rounded-2xl p-1.5 border border-olive-leaf/10 dark:border-gray-700">
      {PRAYER_LABELS.slice(0, segmentCount).map((label, i) => {
        const isActive = activeSegment === i
        return (
          <button
            key={label}
            onClick={() => onChangeSegment(i)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
              isActive
                ? 'bg-olive-leaf text-cornsilk shadow-sm'
                : 'text-black-forest/60 dark:text-cornsilk/60 hover:bg-olive-leaf/5 dark:hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
