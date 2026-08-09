import '@fortawesome/fontawesome-svg-core/styles.css'
import type { JSX } from 'react'

export const Header = (): JSX.Element => (
  <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
    <div className="container mx-auto px-6 py-4 flex items-center">
      <a
        href="/"
        className="text-lg font-black tracking-widest text-gray-900 hover:text-indigo-600 transition-colors"
      >
        ENTAKU
      </a>
      <nav className="ml-auto flex gap-8">
        <a
          href="/"
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          Home
        </a>
        <a
          href="/personal"
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          Personal
        </a>
        <a
          href="/articles"
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          Articles
        </a>
      </nav>
    </div>
  </header>
)

export default Header
