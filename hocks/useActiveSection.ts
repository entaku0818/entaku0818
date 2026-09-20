import { useEffect, useState } from 'react'

/**
 * いま画面の中央あたりに来ているセクションの id を返す。
 * IntersectionObserver が無い環境では null のまま（=どこも強調しない）。
 */
export const useActiveSection = (ids: string[]): string | null => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sections = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    if (sections.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // 複数が同時に見えているときは、ページ上で先に来るセクションを選ぶ
        const current = sections.find((section) => visible.has(section.id))
        setActiveId(current?.id ?? null)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [key])

  return activeId
}

export default useActiveSection
