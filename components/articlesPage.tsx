import Head from 'next/head'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from './header'
import ArticleCard from './articleCard'
import Article from '../data_class/article'
import { profiles } from '../content/profile'
import labels from '../content/labels'
import type { Lang } from '../content/profile'
import type { JSX } from 'react'

export type ArticlesPageProps = {
  lang: Lang
  articles: Article[]
}

export const ArticlesPage = ({
  lang,
  articles,
}: ArticlesPageProps): JSX.Element => {
  const profile = profiles[lang]
  const l = labels[lang]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head>
        <title>{`${l.articlesTitle} - ${profile.name}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header lang={lang} path="/articles" />
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="space-y-16">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-2xl">📚</span>
                {l.articlesTitle}
              </h2>
              <div className="text-sm text-gray-500">
                {l.articlesCount(articles.length)}
              </div>
            </div>
            {l.articlesNote && (
              <p className="text-sm text-gray-500 mb-12">{l.articlesNote}</p>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          Powered by {profile.name}
        </div>
      </footer>
    </div>
  )
}

export default ArticlesPage
