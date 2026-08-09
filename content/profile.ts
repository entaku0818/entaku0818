import profileJson from './profile.json'

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
}

/**
 * entaku.dev のトップページと README.md の共通データ。
 * README.md は `yarn readme` でこのデータから生成される。
 */
export const profile = profileJson as Profile

export default profile
