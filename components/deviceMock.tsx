import type { JSX, ReactNode } from 'react'

/** 画面の縦横比。iPhone 6.7インチと同じ */
export const SCREEN_ASPECT = '620 / 1344'

/**
 * CSSだけで描くiPhoneの枠。画像アセットは使わない。
 * 中に入れるスクリーンショットにはステータスバーやDynamic Islandが写っているので、
 * ここでは本体と画面だけを描いて二重にならないようにしている。
 */
export const DeviceMock = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}): JSX.Element => (
  <div
    className={`relative mx-auto w-[220px] sm:w-[260px] lg:w-[300px] ${className}`}
  >
    {/* 側面のボタン */}
    <span
      aria-hidden="true"
      className="absolute top-[13%] -left-[2px] h-[4%] w-[3px] rounded-l-sm bg-neutral-700"
    />
    <span
      aria-hidden="true"
      className="absolute top-[20%] -left-[2px] h-[7%] w-[3px] rounded-l-sm bg-neutral-700"
    />
    <span
      aria-hidden="true"
      className="absolute top-[29%] -left-[2px] h-[7%] w-[3px] rounded-l-sm bg-neutral-700"
    />
    <span
      aria-hidden="true"
      className="absolute top-[22%] -right-[2px] h-[11%] w-[3px] rounded-r-sm bg-neutral-700"
    />

    {/* 本体 */}
    <div className="relative rounded-[11.5%/5.3%] bg-neutral-900 p-[2.8%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
      {/* 画面 */}
      <div
        className="relative overflow-hidden rounded-[9.5%/4.4%] bg-white"
        style={{ aspectRatio: SCREEN_ASPECT }}
      >
        {children}
      </div>
    </div>
  </div>
)

export default DeviceMock
