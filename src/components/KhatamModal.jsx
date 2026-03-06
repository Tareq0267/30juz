import { useEffect, useState } from 'react'
import { T } from '../i18n/translations'

export default function KhatamModal({ khatamCount, onReset, onDismiss, language }) {
  const t = T[language] ?? T.ms
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(id)
  }, [])

  // This is their (khatamCount + 1)th completion since khatamCount tracks resets
  const completionNumber = khatamCount + 1

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onDismiss} />

      {/* Bottom sheet */}
      <div
        className={`relative w-full max-w-md rounded-t-3xl px-8 pt-10 pb-10 text-center shadow-2xl overflow-hidden transition-transform duration-500 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ background: 'linear-gradient(160deg, #4a6741 0%, #2c3e29 60%, #1a2418 100%)' }}
      >
        {/* Decorative stars */}
        <span className="absolute top-5 left-7 text-cornsilk/20 text-2xl select-none">✦</span>
        <span className="absolute top-4 right-12 text-cornsilk/15 text-lg select-none">✦</span>
        <span className="absolute top-12 right-7 text-cornsilk/25 text-sm select-none">✦</span>
        <span className="absolute top-8 left-16 text-cornsilk/10 text-xs select-none">✦</span>

        {/* Crescent */}
        <div className="text-5xl mb-5 animate-pulse select-none">☽</div>

        {/* Arabic */}
        <p className="font-uthmani text-4xl leading-relaxed mb-3 text-cornsilk">
          ٱلْحَمْدُ لِلَّهِ
        </p>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-cornsilk">Alhamdulillah!</h2>

        {/* Khatam count badge */}
        <div className="inline-block bg-cornsilk/15 border border-cornsilk/25 rounded-full px-5 py-1.5 text-sm font-semibold mb-4 text-cornsilk">
          {t.khatamNumber(completionNumber)}
        </div>

        {/* Message */}
        <p className="text-sm text-cornsilk/70 mb-8 leading-relaxed">
          {t.khatamModalMessage}
        </p>

        {/* Start again */}
        <button
          onClick={onReset}
          className="w-full bg-cornsilk text-olive-leaf py-3.5 rounded-2xl font-semibold text-sm mb-3 hover:bg-cornsilk/90 active:scale-95 transition-all"
        >
          {t.startAgain}
        </button>

        {/* Close */}
        <button
          onClick={onDismiss}
          className="w-full bg-cornsilk/10 border border-cornsilk/15 text-cornsilk/60 py-3 rounded-2xl font-medium text-sm hover:bg-cornsilk/20 active:scale-95 transition-all"
        >
          {t.closeModal}
        </button>
      </div>
    </div>
  )
}
