import profileJaJson from './profile.ja.json'
import profileEnJson from './profile.en.json'

export type Link = {
  label: string
  url: string
}

export type Talk = {
  event: string
  title: string
  links: Link[]
}

export type Community = {
  name: string
  role: string
  url: string
  linkLabel: string
  description: string
}

export type Highlight = {
  /** 省略した場合は見出しなしの箇条書きとして扱う */
  title?: string
  /** マークダウンのインラインリンクを含められる */
  points: string[]
}

export type TechCategory = {
  label: string
  items: string[]
}

export type Deliverable = {
  name: string
  url: string
  description?: string
}

export type Experience = {
  company: string
  period: string
  url: string
  overview: string
  highlights: Highlight[]
  deliverables?: Deliverable[]
  tech: TechCategory[]
}

export type SideProject = {
  title: string
  period: string
  url?: string
  /** README.md でのリンク表記に使うサービス名 */
  siteName?: string
  overview: string
  points: string[]
  tech?: string[]
}

export type Profile = {
  name: string
  role: string
  description: string
  githubUsername: string
  twitterUrl: string
  twitterId: string
  githubUrl: string
  siteUrl: string
  summary: string[]
  technicalBackground: string[]
  specialties: string[]
  talks: Talk[]
  communities: Community[]
  experiences: Experience[]
  sideProjects: SideProject[]
  personalApps: PersonalApp[]
}

export type PersonalApp = {
  name: string
  /** カード見出しの下に出る一行キャッチ */
  tagline: string
  /** iOS / Android など、配信しているプラットフォーム */
  platform: string
  overview: string
  /**
   * 端末モックに入れる画面画像（public/apps 配下）。
   * App Store のスクショから画面部分だけを切り出したもの。未配信のアプリには無い。
   */
  screenshot?: string
  /** 順位・評価・技術的な見どころなど、実績として並べる短い文 */
  metrics?: string[]
  tech: string[]
  /** App Store / Google Play へのリンク。未公開のものは空配列 */
  links: Link[]
}

/** ストアで配信中のアプリだけを数える。未配信のプロトタイプは実績に含めない */
export const releasedApps = (profile: Profile): PersonalApp[] =>
  profile.personalApps.filter((app) => app.links.length > 0)

export type Lang = 'ja' | 'en'

/**
 * entaku.dev のトップページと README のデータ。
 * 日本語は `/` と README.md、英語は `/en` と README.en.md に対応する。
 * README は `yarn readme` でこのデータから生成される。
 */
export const profileJa = profileJaJson as Profile
export const profileEn = profileEnJson as Profile

export const profiles: Record<Lang, Profile> = {
  ja: profileJa,
  en: profileEn,
}

/** Next.js の i18n ルーティングから渡ってくる locale を Lang に落とす */
export const toLang = (locale?: string): Lang => (locale === 'en' ? 'en' : 'ja')

export default profileJa
