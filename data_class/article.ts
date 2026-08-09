class Article {
  name: string
  type: ArticleType
  url: string
  created: Date
  constructor(init?: Partial<Article>) {
    Object.assign(this, init)
  }
}

export type ArticleType = 'Qiita' | 'Zenn' | 'Note'

export default Article
