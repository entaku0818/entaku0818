import Head from 'next/head'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from '../components/header'
import Article, { ArticleType } from '../data_class/article'
import ArticleCard from '../components/articleCard'
import type { JSX } from 'react'

type Props = {
  articles: Article[]
}

export const Articles = ({ articles }: Props): JSX.Element => (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <Head>
      <title>Portfolio - entaku</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="space-y-16">
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-2xl">📚</span>
              Articles
            </h2>
            <div className="text-sm text-gray-500">
              {articles.length} articles
            </div>
          </div>
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
        Powered by entaku
      </div>
    </footer>
  </div>
)

export async function getStaticProps() {
  const res = await fetch(
    'https://sheets.googleapis.com/v4/spreadsheets/1S286LYrmDHOPjvZHQh8d2pSg_MVaZOb_Znr9zUahd2M/values/article?key=AIzaSyAxzVLiIMLhFGrQUeU0JH8sL-7-0o4iXxY'
  )
  const json = await res.json()

  const articles = await json.values.flatMap((elm) => {
    const type: ArticleType =
      String(elm[1]) === '1'
        ? 'Qiita'
        : String(elm[1]) === '2'
        ? 'Zenn'
        : 'Note'
    const obj = {
      name: elm[0],
      type: type,
      url: elm[2],
    }
    const article = new Article(obj)
    return article
  })

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
  }
}

export default Articles
