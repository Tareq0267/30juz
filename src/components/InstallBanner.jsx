import { T } from '../i18n/translations'

export default function InstallBanner({ onInstall, onDismiss, language = 'ms' }) {
  const t = T[language] ?? T.ms
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black-forest dark:bg-gray-800 text-cornsilk shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
      <div className="max-w-2xl mx-auto flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sunlit-clay/20 flex items-center justify-center text-lg shrink-0">
          📖
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{t.installTitle}</p>
          <p className="text-xs text-cornsilk/60">{t.installDesc}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={onDismiss}
            className="text-xs text-cornsilk/50 hover:text-cornsilk/80 px-2 py-1.5"
          >
            {t.later}
          </button>
          <button
            onClick={onInstall}
            className="bg-sunlit-clay text-black-forest text-xs font-semibold px-4 py-1.5 rounded-xl hover:bg-copperwood transition-colors"
          >
            {t.install}
          </button>
        </div>
      </div>
    </div>
  )
}
