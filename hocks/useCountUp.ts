import { useRef, useState } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
import prefersReducedMotion from './prefersReducedMotion'

export type CountUpOptions = {
  decimals?: number
  durationMs?: number
}

/** 最初は速く、終わりに向かって減速する */
const easeOut = (progress: number) => 1 - (1 - progress) ** 3

/**
 * 画面に入ったタイミングで 0 から target までカウントアップする。
 *
 * 初期値は target。SSR の HTML と、IntersectionObserver が無い環境、
 * 動きを控える設定のときは最終的な数がそのまま出る。演出できるときだけ
 * 描画前に 0 に落とすので、正しい数から 0 に戻るようには見えない。
 */
export const useCountUp = (
  target: number,
  { decimals = 0, durationMs = 1400 }: CountUpOptions = {},
) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(target)

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    if (
      typeof IntersectionObserver === 'undefined' ||
      typeof requestAnimationFrame === 'undefined' ||
      prefersReducedMotion()
    ) {
      setValue(target)
      return
    }

    setValue(0)

    let frame = 0
    let safetyNet = 0
    let start = 0

    const step = (timestamp: number) => {
      if (start === 0) start = timestamp
      const progress = Math.min(1, (timestamp - start) / durationMs)
      setValue(target * easeOut(progress))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        frame = requestAnimationFrame(step)
        // requestAnimationFrame が間引かれても 0 のままにならないようにする
        safetyNet = window.setTimeout(() => setValue(target), durationMs + 500)
      },
      { threshold: 0.4 },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      clearTimeout(safetyNet)
    }
  }, [target, durationMs])

  return { ref, display: value.toFixed(decimals) }
}

export default useCountUp
