import type { GetStaticProps } from 'next'
import PersonalPage from '../components/personalPage'
import readPersonalContent from '../lib/personal'
import { toLang } from '../content/profile'
import type { Lang } from '../content/profile'
import type { JSX } from 'react'

export type PersonalProps = {
  lang?: Lang
  content: string
}

export const Personal = ({
  lang = 'ja',
  content,
}: PersonalProps): JSX.Element => <PersonalPage lang={lang} content={content} />

export const getStaticProps: GetStaticProps<PersonalProps> = async ({
  locale,
}) => {
  const lang = toLang(locale)

  return { props: { lang, content: await readPersonalContent(lang) } }
}

export default Personal
