import Image from 'next/image'
import DeviceMock from './deviceMock'
import { Rise } from './reveal'
import useReveal from '../hocks/useReveal'
import labels from '../content/labels'
import type { Lang, PersonalApp } from '../content/profile'
import type { JSX } from 'react'

/** モックの実寸より少し大きい元画像を用意してあるので、表示幅だけ伝える */
const SIZES = '(min-width: 1024px) 300px, (min-width: 640px) 260px, 220px'

export type AppSectionProps = {
  app: PersonalApp
  lang: Lang
  /** 偶数番は端末を左、奇数番は右に置いて左右交互にする */
  index: number
}

/**
 * 個人開発アプリ1本ぶんのセクション。画面いっぱいを使い、端末モックとテキストを左右に振る。
 * スクロールで端末が先に上がってきて、テキストが少し遅れて続く。
 * 監視はセクションにひとつだけ置き、遅延は transition-delay で付ける。
 */
export const AppSection = ({
  app,
  lang,
  index,
}: AppSectionProps): JSX.Element => {
  const l = labels[lang]
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.15 })
  const deviceRight = index % 2 === 1
  const released = app.links.length > 0

  return (
    <section
      ref={ref}
      data-app={app.name}
      className={index % 2 === 1 ? 'bg-surface' : 'bg-white'}
    >
      <div className="container mx-auto px-6 py-20 sm:py-28 lg:py-36">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Rise
            visible={visible}
            className={deviceRight ? 'lg:order-2' : undefined}
          >
            <DeviceMock>
              {app.screenshot ? (
                <Image
                  src={app.screenshot}
                  alt={`${app.name} の画面`}
                  width={620}
                  height={1344}
                  sizes={SIZES}
                  className="h-full w-full object-cover"
                  priority={index === 0}
                />
              ) : (
                // スクリーンショットが無いアプリ（ストア未配信）はテキストで埋める
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-surface px-6 text-center">
                  <p className="text-sm font-semibold text-ink">{app.name}</p>
                  <p className="text-xs text-muted">{l.apps.placeholder}</p>
                </div>
              )}
            </DeviceMock>
          </Rise>

          <Rise
            visible={visible}
            delay={140}
            className={deviceRight ? 'lg:order-1' : undefined}
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
              {app.platform}
              {!released && ` · ${l.apps.unreleased}`}
            </p>
            <h3 className="wrap-jp mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl">
              {app.name}
            </h3>
            <p className="wrap-jp mt-4 text-xl leading-snug font-medium text-muted sm:text-2xl">
              {app.tagline}
            </p>
            <p className="mt-6 max-w-xl leading-relaxed text-ink/70">
              {app.overview}
            </p>

            {app.metrics && app.metrics.length > 0 && (
              <ul className="mt-8 max-w-xl space-y-3 border-t border-hairline pt-6">
                {app.metrics.map((metric) => (
                  <li
                    key={metric}
                    className="flex items-start gap-3 text-sm font-medium text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                    />
                    {metric}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-1.5">
              {app.tech.map((item) => (
                <span key={item} className="text-xs text-muted">
                  {item}
                </span>
              ))}
            </div>

            {released && (
              <div className="mt-8 flex flex-wrap gap-6">
                {app.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-base font-medium text-accent transition-colors hover:text-accent-hover"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      ›
                    </span>
                  </a>
                ))}
              </div>
            )}
          </Rise>
        </div>
      </div>
    </section>
  )
}

export default AppSection
