import Head from 'next/head'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from './header'
import type { JSX } from 'react'
import ReactMarkdown from 'react-markdown'
import { profiles } from '../content/profile'
import labels from '../content/labels'
import type { Lang } from '../content/profile'

export type PersonalPageProps = {
  lang: Lang
  content: string
}

export const PersonalPage = ({
  lang,
  content,
}: PersonalPageProps): JSX.Element => {
  const profile = profiles[lang]
  const l = labels[lang]

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{`${l.personalTitle} - ${profile.name}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header lang={lang} path="/personal" />

      <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
        <div className="container mx-auto px-6 pt-40 pb-24">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4">
            {l.personalEyebrow}
          </p>
          <h1 className="text-6xl font-black text-white leading-none">
            {l.personalTitle}
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-6 py-20 max-w-3xl">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
          <ReactMarkdown
            components={{
              h1: ({ ...props }) => (
                <h1
                  className="text-2xl font-bold mb-6 text-gray-900 pl-4 border-l-4 border-indigo-500"
                  {...props}
                />
              ),
              h2: ({ ...props }) => (
                <h2
                  className="text-xl font-bold mt-10 mb-4 text-gray-900 pl-4 border-l-4 border-indigo-300"
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <h3
                  className="text-lg font-bold mt-6 mb-3 text-gray-800"
                  {...props}
                />
              ),
              p: ({ ...props }) => (
                <p
                  className="mb-4 text-gray-600 leading-relaxed text-sm"
                  {...props}
                />
              ),
              ul: ({ ...props }) => (
                <ul className="mb-4 space-y-2" {...props} />
              ),
              ol: ({ ...props }) => (
                <ol
                  className="list-decimal list-inside mb-4 text-gray-600 text-sm"
                  {...props}
                />
              ),
              li: ({ ...props }) => (
                <li className="flex gap-3 items-start text-gray-600 text-sm">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  <span {...props} />
                </li>
              ),
              blockquote: ({ ...props }) => (
                <blockquote
                  className="border-l-4 border-indigo-200 pl-4 italic my-4 text-gray-500 text-sm"
                  {...props}
                />
              ),
              a: ({ ...props }) => (
                <a
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  {...props}
                />
              ),
              hr: ({ ...props }) => (
                <hr className="border-gray-100 my-8" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg font-black tracking-widest mb-2">
            {profile.name.toUpperCase()}
          </p>
          <p className="text-gray-400 text-sm">{profile.role}</p>
        </div>
      </footer>
    </div>
  )
}

export default PersonalPage
