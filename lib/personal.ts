import type { Lang } from '../content/profile'

const files: Record<Lang, string> = {
  ja: 'personal.md',
  en: 'personal.en.md',
}

/** personal のマークダウンはリポジトリで管理しているため、ビルド時に読み込む */
export const readPersonalContent = async (lang: Lang): Promise<string> => {
  const { readFile } = await import('node:fs/promises')
  const { join } = await import('node:path')

  return readFile(join(process.cwd(), files[lang]), 'utf8')
}

export default readPersonalContent
