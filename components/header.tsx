import '@fortawesome/fontawesome-svg-core/styles.css'
import labels from '../content/labels'
import useActiveSection from '../hocks/useActiveSection'
import useScrolled from '../hocks/useScrolled'
import type { Lang } from '../content/profile'
import type { JSX } from 'react'

const navLinkClass = 'text-sm text-muted hover:text-ink transition-colors'

/** 英語ロケールは /en 配下に出るため、リンクは自分で接頭辞を付ける */
const localePath = (lang: Lang, path: string) =>
  lang === 'en' ? `/en${path}` : path || '/'

export type HeaderSection = { id: string; label: string }

export type HeaderProps = {
  lang?: Lang
  /** 表示中のページのパス。言語切り替えで同じページに留まるために使う */
  path?: string
  /** 同一ページ内のアンカー。渡すとスクロールに追従してアクティブ表示する */
  sections?: HeaderSection[]
  /** 右端に出す「ご相談」ボタンのリンク先。省略すると出さない */
  ctaHref?: string
  ctaLabel?: string
}

export const Header = ({
  lang = 'ja',
  path = '',
  sections = [],
  ctaHref,
  ctaLabel,
}: HeaderProps): JSX.Element => {
  const l = labels[lang]
  const otherLang: Lang = lang === 'ja' ? 'en' : 'ja'
  const activeId = useActiveSection(sections.map((section) => section.id))
  const scrolled = useScrolled()

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-hairline/70 bg-white/80 py-2.5 backdrop-blur-xl'
          : 'border-b border-transparent bg-white/70 py-4 backdrop-blur-xl'
      }`}
    >
      <div className="container mx-auto flex items-center gap-4 px-6">
        <a
          href={localePath(lang, '')}
          className="text-base font-semibold tracking-[0.18em] text-ink transition-colors hover:text-accent"
        >
          ENTAKU
        </a>

        <nav className="ml-auto hidden items-center gap-7 md:flex">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={activeId === section.id ? 'true' : undefined}
              className={`relative text-sm transition-colors ${
                activeId === section.id
                  ? 'font-medium text-ink'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {section.label}
              <span
                aria-hidden="true"
                className={`absolute -bottom-2 left-0 h-px bg-ink transition-all duration-300 ${
                  activeId === section.id ? 'w-full' : 'w-0'
                }`}
              />
            </a>
          ))}
          {sections.length > 0 && (
            <span aria-hidden="true" className="h-3.5 w-px bg-hairline" />
          )}
          <a href={localePath(lang, '/personal')} className={navLinkClass}>
            {l.nav.personal}
          </a>
          <a href={localePath(lang, '/articles')} className={navLinkClass}>
            {l.nav.articles}
          </a>
          <a
            href={localePath(otherLang, path)}
            className="text-sm text-accent transition-colors hover:text-accent-hover"
          >
            {l.switchLangLabel}
          </a>
        </nav>

        {/*
          モバイルは横幅が足りないので段を折らずに絞る。
          トップはCTA優先、他のページはページ間のリンクを残す。
        */}
        <div className="ml-auto flex items-center gap-3 md:ml-0 md:hidden">
          {sections.length === 0 && (
            <>
              <a
                href={localePath(lang, '/personal')}
                className="text-xs text-muted transition-colors hover:text-ink"
              >
                {l.nav.personal}
              </a>
              <a
                href={localePath(lang, '/articles')}
                className="text-xs text-muted transition-colors hover:text-ink"
              >
                {l.nav.articles}
              </a>
            </>
          )}
          <a
            href={localePath(otherLang, path)}
            className="text-xs text-accent transition-colors hover:text-accent-hover"
          >
            {l.switchLangLabel}
          </a>
          {ctaHref && ctaLabel && (
            <a
              href={ctaHref}
              className="rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover"
            >
              {ctaLabel}
            </a>
          )}
        </div>

        {ctaHref && ctaLabel && (
          <a
            href={ctaHref}
            className="hidden rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover md:inline-block"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </header>
  )
}

export default Header
