import '@fortawesome/fontawesome-svg-core/styles.css'
import labels from '../content/labels'
import type { Lang } from '../content/profile'
import type { JSX } from 'react'

const navLinkClass =
  'text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors'

/** 英語ロケールは /en 配下に出るため、リンクは自分で接頭辞を付ける */
const localePath = (lang: Lang, path: string) =>
  lang === 'en' ? `/en${path}` : path || '/'

export type HeaderProps = {
  lang?: Lang
  /** 表示中のページのパス。言語切り替えで同じページに留まるために使う */
  path?: string
}

export const Header = ({
  lang = 'ja',
  path = '',
}: HeaderProps): JSX.Element => {
  const { switchLangLabel } = labels[lang]
  const otherLang: Lang = lang === 'ja' ? 'en' : 'ja'

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex items-center">
        <a
          href={localePath(lang, '')}
          className="text-lg font-black tracking-widest text-gray-900 hover:text-indigo-600 transition-colors"
        >
          ENTAKU
        </a>
        <nav className="ml-auto flex gap-8 items-center">
          <a href={localePath(lang, '')} className={navLinkClass}>
            Home
          </a>
          <a href={localePath(lang, '/personal')} className={navLinkClass}>
            Personal
          </a>
          <a href={localePath(lang, '/articles')} className={navLinkClass}>
            Articles
          </a>
          <a
            href={localePath(otherLang, path)}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            {switchLangLabel}
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
