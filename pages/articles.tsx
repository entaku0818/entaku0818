import type { GetStaticProps } from 'next'
import ArticlesPage from '../components/articlesPage'
import { fetchSerializableArticles } from '../lib/articles'
import { toLang } from '../content/profile'
import type { Lang } from '../content/profile'
import type Article from '../data_class/article'
import type { JSX } from 'react'

export type ArticlesProps = {
  lang?: Lang
  articles: Article[]
}

export const Articles = ({
  lang = 'ja',
  articles,
}: ArticlesProps): JSX.Element => (
  <ArticlesPage lang={lang} articles={articles} />
)

export const getStaticProps: GetStaticProps<ArticlesProps> = async ({
  locale,
}) => ({
  props: { lang: toLang(locale), articles: await fetchSerializableArticles() },
})

export default Articles
