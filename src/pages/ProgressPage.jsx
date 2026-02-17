export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-black-forest dark:text-cornsilk">Your Progress</h1>

      {/* 30-day grid */}
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="aspect-square rounded-xl bg-white dark:bg-gray-800 border border-olive-leaf/10 dark:border-gray-700 flex items-center justify-center text-sm font-medium text-black-forest/60 dark:text-cornsilk/60 shadow-sm"
          >
            {i + 1}
          </div>
        ))}
      </div>

      <p className="text-sm text-black-forest/50 dark:text-cornsilk/50 text-center">
        Progress tracking will be fully functional in Phase 4.
      </p>
    </div>
  )
}
