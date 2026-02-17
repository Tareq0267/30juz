export default function LoadingSkeleton({ count = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-olive-leaf/10 dark:border-gray-700 animate-pulse"
        >
          <div className="w-8 h-8 rounded-lg bg-olive-leaf/10 dark:bg-gray-700 mb-3" />
          <div className="h-8 bg-olive-leaf/10 dark:bg-gray-700 rounded-lg mb-3 w-full" />
          <div className="h-4 bg-olive-leaf/5 dark:bg-gray-700 rounded mb-2 w-11/12" />
          <div className="h-4 bg-olive-leaf/5 dark:bg-gray-700 rounded w-9/12" />
        </div>
      ))}
    </div>
  )
}
