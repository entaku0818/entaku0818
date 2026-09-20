import useReveal from '../hocks/useReveal'
import type { JSX, ReactNode } from 'react'

/**
 * 下から少し上がって現れる。派手に動かさず、透明度と縦の移動だけにとどめる。
 * Tailwind v4 の translate-y-* は transform ではなく translate プロパティを使うので、
 * transition の対象も translate にする（transform にすると移動だけ瞬間移動する）。
 */
const riseClass = (visible: boolean) =>
  `transition-[opacity,translate] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
    visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
  }`

export type RiseProps = {
  visible: boolean
  /** 同じセクション内で順番に出したいときのミリ秒 */
  delay?: number
  className?: string
  children: ReactNode
}

/**
 * 表示状態を外から受け取る版。
 * ひとつの IntersectionObserver で複数の要素を動かしたいときに使う
 * （要素ごとに監視すると発火がばらついて、ガタついて見える）。
 */
export const Rise = ({
  visible,
  delay = 0,
  className = '',
  children,
}: RiseProps): JSX.Element => (
  <div
    className={`${riseClass(visible)} ${className}`}
    style={visible && delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
  >
    {children}
  </div>
)

export type RevealProps = Omit<RiseProps, 'visible'>

/** 自分で監視する版。単独で出したい要素に使う */
export const Reveal = ({
  delay = 0,
  className = '',
  children,
}: RevealProps): JSX.Element => {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <Rise visible={visible} delay={delay} className={className}>
        {children}
      </Rise>
    </div>
  )
}

export default Reveal
