import type { GetStaticProps } from 'next'
import ProfilePage from '../components/profilePage'
import { toLang } from '../content/profile'
import type { Lang } from '../content/profile'
import type { JSX } from 'react'

export type HomeProps = {
  lang?: Lang
}

export const Home = ({ lang = 'ja' }: HomeProps): JSX.Element => (
  <ProfilePage lang={lang} />
)

export const getStaticProps: GetStaticProps<HomeProps> = async ({
  locale,
}) => ({
  props: { lang: toLang(locale) },
})

export default Home
