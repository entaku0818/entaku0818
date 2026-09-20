import { useEffect, useLayoutEffect } from 'react'

/**
 * ブラウザでは useLayoutEffect、サーバーでは useEffect。
 * 描画前に見た目を決めたいが、SSR で React の警告を出したくないときに使う。
 */
export const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

export default useIsomorphicLayoutEffect
