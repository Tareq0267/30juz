import { Link, useLocation } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'

const navItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/reader', label: 'Read', icon: '📖' },
  { path: '/progress', label: 'Progress', icon: '📊' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
]

export default function Header({ dark, onToggleDark }) {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-black-forest/95 dark:bg-gray-800/95 backdrop-blur-sm text-cornsilk shadow-lg">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold tracking-wide">
          Ramadhan <span className="text-sunlit-clay">30 Juz</span>
        </Link>
        <DarkModeToggle dark={dark} onToggle={onToggleDark} />
      </div>

      <nav className="max-w-2xl mx-auto px-4 pb-2 flex gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 text-center py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-sunlit-clay text-black-forest'
                  : 'text-cornsilk/70 hover:text-cornsilk hover:bg-white/10'
              }`}
            >
              <span className="block text-sm">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
