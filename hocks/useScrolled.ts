import { useEffect, useState } from 'react'

/** ページを offset px より下までスクロールしたかどうか。ヘッダーの見た目切り替えに使う */
export const useScrolled = (offset = 12): boolean => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}

export default useScrolled
