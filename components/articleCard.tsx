import '@fortawesome/fontawesome-svg-core/styles.css'
import Article from '../data_class/article'
import * as React from 'react'
import type { JSX } from 'react'

type Props = {
  article: Article
}

const ArticleCard = ({ article }: Props): JSX.Element => (
  <a
    href={article.url}
    target="_blank"
    rel="noreferrer"
    className="block p-6 hover:bg-gray-50 transition-colors duration-200"
  >
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full flex items-center gap-1">
          {getArticleTypeIcon(article.type)}
          {article.type}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
        {article.name}
      </h3>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          Read Article
        </span>
      </div>
    </div>
  </a>
)

const getArticleTypeIcon = (type: string) => {
  switch (type) {
    case 'Qiita':
      return <img src="/qiita.png" alt="Qiita" className="w-4 h-4" />
    case 'Zenn':
      return <img src="/zenn.svg" alt="Zenn" className="w-4 h-4" />
    case 'Note':
      return <img src="/note.svg" alt="Note" className="w-4 h-4" />
    default:
      return null
  }
}

export default ArticleCard
