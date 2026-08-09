import '@fortawesome/fontawesome-svg-core/styles.css'
import * as React from 'react'
import Article from '../data_class/article'
type Props = {
  articles: Article[]
}
class History extends React.Component<Props> {
  render() {
    return (
      <div className="kusa grid grid-flow-col">
        {kusas(this.props.articles).map((kusa, index) =>
          kusa.hasArticle ? (
            <div key={index} className="p-2 border bg-blue-300">
              {kusa.hasArticle}
            </div>
          ) : (
            <div key={index} className="p-2 border border-gray-400">
              {kusa.hasArticle}
            </div>
          )
        )}
        <style jsx>{`
          .kusa {
            grid-template-rows: repeat(7, 0.5fr);
            gap: 3px;
          }
        `}</style>
      </div>
    )
  }
}

function kusas(a: Article[]): Array<Kusa> {
  const kusas: Array<Kusa> = []

  const currentDate = new Date()

  for (let i = 0; i < 365; i++) {
    currentDate.setDate(currentDate.getDate() - 1)
    const kusa = new Kusa()
    kusa.created = currentDate
    kusa.hasArticle = fetchArticles(a, currentDate)
    kusas.push(kusa)
  }
  return kusas
}

function fetchArticles(a: Article[], date: Date): boolean {
  const s = a.find((article) => {
    const dateArticle = new Date(article.created)
    const date1 = new Date(
      dateArticle.getFullYear(),
      dateArticle.getMonth(),
      dateArticle.getDate()
    )
    const date2 = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    return date1.getTime() === date2.getTime()
  })
  return s !== undefined
}

class Kusa {
  hasArticle: boolean
  created: Date
}

export default History
