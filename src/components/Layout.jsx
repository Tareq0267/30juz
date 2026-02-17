import Header from './Header'

export default function Layout({ children, dark, onToggleDark }) {
  return (
    <div className="min-h-screen bg-cornsilk dark:bg-gray-900 transition-colors duration-300">
      <Header dark={dark} onToggleDark={onToggleDark} />
      <main className="max-w-2xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
