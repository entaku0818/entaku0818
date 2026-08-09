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
  /** 言語切り替えリンクの表示名とリンク先 */
  switchLang: { label: string; href: string }
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
    switchLang: { label: 'English', href: '/en' },
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
    switchLang: { label: '日本語', href: '/' },
  },
}

export default labels
