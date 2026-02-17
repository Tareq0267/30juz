export default function DarkModeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sunlit-clay/50"
      style={{ backgroundColor: dark ? '#606c38' : '#dda15e' }}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span
        className="absolute top-0.5 left-0.5 w-6 h-6 bg-cornsilk rounded-full shadow-md transition-transform duration-300 flex items-center justify-center text-sm"
        style={{ transform: dark ? 'translateX(28px)' : 'translateX(0)' }}
      >
        {dark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
