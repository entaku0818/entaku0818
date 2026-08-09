import Head from 'next/head'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from '../components/header'
import { useEffect, useState } from 'react'
import type { JSX } from 'react'
import ReactMarkdown from 'react-markdown'

export const Personal = (): JSX.Element => {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/entaku0818/entaku0818/main/personal.md'
        )
        const text = await response.text()
        setContent(text)
      } catch (error) {
        console.error('Error fetching content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Personal - entaku</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
        <div className="container mx-auto px-6 pt-40 pb-24">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4">
            About Me
          </p>
          <h1 className="text-6xl font-black text-white leading-none">
            Personal
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-6 py-20 max-w-3xl">
        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
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
        )}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg font-black tracking-widest mb-2">ENTAKU</p>
          <p className="text-gray-400 text-sm">Mobile App Developer</p>
        </div>
      </footer>
    </div>
  )
}

export default Personal
