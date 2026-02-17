export default function FontSizeSlider({ fontSize, setFontSize, min, max }) {
  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 border border-olive-leaf/10 dark:border-gray-700">
      <span className="text-xs text-black-forest/50 dark:text-cornsilk/50 font-medium shrink-0">
        Aa
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
        className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer
          bg-olive-leaf/20 dark:bg-gray-600
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-sunlit-clay
          [&::-webkit-slider-thumb]:shadow-md
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-sunlit-clay
          [&::-moz-range-thumb]:border-0"
      />
      <span className="text-lg text-black-forest/50 dark:text-cornsilk/50 font-medium shrink-0">
        Aa
      </span>
    </div>
  )
}
