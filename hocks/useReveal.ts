import { useRef, useState } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
import prefersReducedMotion from './prefersReducedMotion'

export type RevealOptions = {
  /** 要素がこの割合だけ見えたら表示する */
  threshold?: number
}

/**
 * スクロールで画面に入ったかどうかを返す。
 *
 * 初期値は「表示済み」。SSR の HTML と、JavaScript が動かない環境では
 * 中身がそのまま見える。実際に演出できると分かったときだけ、描画前に
 * （useLayoutEffect なのでチラつかない）いったん隠してから監視を始める。
 */
export const useReveal = <T extends HTMLElement>({
  threshold = 0.12,
}: RevealOptions = {}) => {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(true)

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion())
      return

    setVisible(false)
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

export default useReveal
