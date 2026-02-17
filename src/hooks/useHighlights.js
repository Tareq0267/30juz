import { useState, useEffect, useCallback } from 'react'
import { getAllFromStore, putInStore, deleteFromStore, getDB } from '../db/db'

export function useHighlights() {
  const [highlights, setHighlights] = useState(new Set())

  // Load all highlights on mount
  useEffect(() => {
    getAllFromStore('highlights').then((records) => {
      const set = new Set(records.map((r) => r.ayahNumber))
      setHighlights(set)
    })
  }, [])

  const toggleHighlight = useCallback(async (ayahNumber) => {
    setHighlights((prev) => {
      const next = new Set(prev)
      if (next.has(ayahNumber)) {
        next.delete(ayahNumber)
      } else {
        next.add(ayahNumber)
      }
      return next
    })

    // Persist: check if exists, then add or remove
    const db = await getDB()
    const tx = db.transaction('highlights', 'readwrite')
    const store = tx.objectStore('highlights')
    const all = await store.getAll()

    const existing = all.find((r) => r.ayahNumber === ayahNumber)
    if (existing) {
      // Find key by iterating cursor
      const tx2 = db.transaction('highlights', 'readwrite')
      const store2 = tx2.objectStore('highlights')
      let cursor = await store2.openCursor()
      while (cursor) {
        if (cursor.value.ayahNumber === ayahNumber) {
          await cursor.delete()
          break
        }
        cursor = await cursor.continue()
      }
    } else {
      await putInStore('highlights', { ayahNumber, highlightedAt: Date.now() })
    }
  }, [])

  const isHighlighted = useCallback(
    (ayahNumber) => highlights.has(ayahNumber),
    [highlights]
  )

  return { highlights, toggleHighlight, isHighlighted }
}
