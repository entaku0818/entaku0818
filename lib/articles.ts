import Article, { ArticleType } from '../data_class/article'

/** 記事一覧を管理しているスプレッドシート */
const SPREADSHEET_ID = '1S286LYrmDHOPjvZHQh8d2pSg_MVaZOb_Znr9zUahd2M'

const toArticleType = (code: string): ArticleType => {
  if (code === '1') return 'Qiita'
  if (code === '2') return 'Zenn'
  return 'Note'
}

/** ビルド時にスプレッドシートから記事一覧を取得する */
export const fetchArticles = async (): Promise<Article[]> => {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY
  if (!apiKey) {
    throw new Error(
      'GOOGLE_SHEETS_API_KEY が設定されていません。.env.local または Vercel の環境変数を確認してください。',
    )
  }

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/article?key=${apiKey}`,
  )
  const json = await res.json()

  return json.values.map(
    (row: string[]) =>
      new Article({
        name: row[0],
        type: toArticleType(String(row[1])),
        url: row[2],
      }),
  )
}

/** getStaticProps でそのまま渡せるようにシリアライズする */
export const fetchSerializableArticles = async (): Promise<Article[]> =>
  JSON.parse(JSON.stringify(await fetchArticles()))

export default fetchArticles
