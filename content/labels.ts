import type { Lang } from './profile'

/** ページ側の見出しなど、プロフィールデータに含まれないUI文言 */
export type Labels = {
  overview: string
  technicalBackground: string
  specialties: string
  talks: string
  communities: string
  experience: string
  sideProjects: string
  projectOverview: string
  achievements: string
  deliverables: string
  tech: string
  website: string
  personalEyebrow: string
  personalTitle: string
  articlesTitle: string
  articlesCount: (count: number) => string
  /** 記事本文が日本語であることの注記。日本語ページでは表示しない */
  articlesNote?: string
  /** 言語切り替えリンクの表示名。リンク先は Header が現在のパスから組み立てる */
  switchLangLabel: string
}

export const labels: Record<Lang, Labels> = {
  ja: {
    overview: '概要',
    technicalBackground: '技術略歴',
    specialties: '得意なこと',
    talks: '登壇歴',
    communities: 'コミュニティ活動',
    experience: '職歴',
    sideProjects: 'Side Projects',
    projectOverview: 'プロジェクト概要',
    achievements: '実績・取り組み',
    deliverables: '主な成果物',
    tech: '利用技術',
    website: 'Website',
    personalEyebrow: 'About Me',
    personalTitle: 'Personal',
    articlesTitle: 'Articles',
    articlesCount: (count) => `${count}件`,
    switchLangLabel: 'English',
  },
  en: {
    overview: 'Overview',
    technicalBackground: 'Background',
    specialties: 'What I do best',
    talks: 'Talks',
    communities: 'Community',
    experience: 'Experience',
    sideProjects: 'Side Projects',
    projectOverview: 'Project overview',
    achievements: 'Highlights',
    deliverables: 'Deliverables',
    tech: 'Tech stack',
    website: 'Website',
    personalEyebrow: 'About Me',
    personalTitle: 'Personal',
    articlesTitle: 'Articles',
    articlesCount: (count) => `${count} articles`,
    articlesNote: 'The posts themselves are written in Japanese.',
    switchLangLabel: '日本語',
  },
}

export default labels
