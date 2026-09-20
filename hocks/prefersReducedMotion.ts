/**
 * OSの「視差効果を減らす」設定が入っているか。
 * 演出を始める直前に毎回見るので、hook ではなく素の関数にしている。
 * SSR とテスト環境では matchMedia が無いので false（=演出してよい）を返す。
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default prefersReducedMotion
