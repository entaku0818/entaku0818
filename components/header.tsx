import '@fortawesome/fontawesome-svg-core/styles.css'
import labels from '../content/labels'
import type { Lang } from '../content/profile'
import type { JSX } from 'react'

const navLinkClass =
  'text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors'

/**
 * personal / articles は日本語コンテンツのみ。
 * 英語ページからは日本語である旨を添えてリンクする。
 */
const subPages = (lang: Lang) => [
  { href: '/personal', label: lang === 'ja' ? 'Personal' : 'Personal (JA)' },
  { href: '/articles', label: lang === 'ja' ? 'Articles' : 'Articles (JA)' },
]

export const Header = ({ lang = 'ja' }: { lang?: Lang }): JSX.Element => {
  const home = lang === 'ja' ? '/' : '/en'
  const { switchLang } = labels[lang]

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex items-center">
        <a
          href={home}
          className="text-lg font-black tracking-widest text-gray-900 hover:text-indigo-600 transition-colors"
        >
          ENTAKU
        </a>
        <nav className="ml-auto flex gap-8 items-center">
          <a href={home} className={navLinkClass}>
            Home
          </a>
          {subPages(lang).map((page) => (
            <a key={page.href} href={page.href} className={navLinkClass}>
              {page.label}
            </a>
          ))}
          <a
            href={switchLang.href}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            {switchLang.label}
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
