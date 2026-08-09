/** @type {import('next').NextConfig} */
const nextConfig = {
  // 日本語を既定とし、英語は /en 配下に出す。
  // localeDetection を切っているので、ブラウザの言語設定でリダイレクトされることはない。
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    localeDetection: false,
  },
}

module.exports = nextConfig
