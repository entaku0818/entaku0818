import type { Lang } from './profile'

/** ヒーローでカウントアップさせる数値。value は数、それ以外は飾り */
export type HeroStat = {
  value: number
  /** 小数点以下の桁数。省略時は整数として扱う */
  decimals?: number
  suffix?: string
  label: string
}

/** フォームのバリデーションが返すエラーコード */
export type FieldErrorCode = 'required' | 'invalid_email' | 'too_long'

/** ページ側の見出しなど、プロフィールデータに含まれないUI文言 */
export type Labels = {
  overview: string
  technicalBackground: string
  specialties: string
  talks: string
  communities: string
  experience: string
  sideProjects: string
  personalApps: string
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
  nav: {
    apps: string
    about: string
    contact: string
    home: string
    personal: string
    articles: string
  }
  hero: {
    headline: string
    stack: string
    lead: string
    primaryCta: string
    secondaryCta: string
    /** 配信中アプリの本数は personalApps から数えるので引数で受ける */
    stats: (releasedAppCount: number) => HeroStat[]
  }
  apps: {
    eyebrow: string
    title: string
    lead: string
    /** ストア未配信のアプリに付けるラベル */
    unreleased: string
    highlights: string
    /** スクリーンショットが無いアプリの端末モックに入れる文言 */
    placeholder: string
    /** ストア未配信のアプリをまとめる小さなブロックの見出し */
    prototypes: string
  }
  about: {
    eyebrow: string
    title: string
  }
  /** 職歴・登壇・コミュニティを畳んでおくセクション */
  more: {
    eyebrow: string
    title: string
    lead: string
  }
  contact: {
    eyebrow: string
    title: string
    lead: string
    name: string
    namePlaceholder: string
    email: string
    emailPlaceholder: string
    budget: string
    budgetPlaceholder: string
    message: string
    messagePlaceholder: string
    required: string
    optional: string
    submit: string
    submitting: string
    success: string
    successDetail: string
    /** 入力に不備があるとき。どの欄が悪いかは欄ごとに出す */
    invalid: string
    error: string
    notConfigured: string
    rateLimited: string
    privacy: string
    /** honeypot をスクリーンリーダーにだけ説明するラベル */
    honeypot: string
    fieldError: (code: FieldErrorCode) => string
  }
  footerNote: string
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
    personalApps: '個人開発',
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
    nav: {
      apps: '個人開発',
      about: 'できること',
      contact: 'ご相談',
      home: 'Home',
      personal: 'Personal',
      articles: 'Articles',
    },
    hero: {
      headline: 'アプリを、ひとりで。',
      stack: 'iOS ・ Android ・ Go',
      lead: '企画から設計・実装、ストア申請、リリース後の運用まで。仕事ではiOSのリードエンジニアとして、個人ではこれを全部ひとりでやっています。',
      primaryCta: '開発のご相談',
      secondaryCta: '個人開発を見る',
      stats: (releasedAppCount) => [
        {
          value: releasedAppCount,
          suffix: '本',
          label: '配信中の個人開発アプリ',
        },
        {
          value: 4.2,
          decimals: 1,
          label: 'シンプル録音の App Store 評価（229件）',
        },
        { value: 10, suffix: '年+', label: 'ソフトウェア開発歴' },
      ],
    },
    apps: {
      eyebrow: 'Personal Apps',
      title: '個人開発',
      lead: '仕事とは別に、自分で企画して App Store / Google Play に出しているアプリです。',
      unreleased: '未配信',
      highlights: '見どころ',
      placeholder: 'ストア未配信',
      prototypes: 'プロトタイプ',
    },
    about: {
      eyebrow: 'About',
      title: 'できること',
    },
    more: {
      eyebrow: 'More',
      title: 'これまでの仕事',
      lead: '職歴・登壇・コミュニティ活動は、見たいものだけ開いてください。',
    },
    contact: {
      eyebrow: 'Contact',
      title: '開発のご相談',
      lead: 'iOS / Android アプリの新規開発、既存アプリの改善、技術相談など。まずはざっくりした内容で構いません。',
      name: 'お名前',
      namePlaceholder: '山田 太郎',
      email: '連絡先メールアドレス',
      emailPlaceholder: 'you@example.com',
      budget: 'ご予算感',
      budgetPlaceholder: '未定 / 〜50万円 / 50〜150万円 など',
      message: 'ご相談内容',
      messagePlaceholder:
        'つくりたいもの、現在の状況、希望スケジュールなどをお書きください。',
      required: '必須',
      optional: '任意',
      submit: '送信する',
      submitting: '送信中…',
      success: '送信しました。ありがとうございます。',
      successDetail: '2営業日以内にご返信します。',
      invalid: '入力内容をご確認ください。',
      error: '送信に失敗しました。時間をおいてもう一度お試しください。',
      notConfigured:
        'ただいまフォームからの送信を準備中です。お手数ですが X または GitHub からご連絡ください。',
      rateLimited:
        '短時間に送信が続いています。しばらく時間をおいてからお試しください。',
      privacy: 'いただいた内容は、ご相談への返信にのみ利用します。',
      honeypot: 'この欄は入力しないでください',
      fieldError: (code) =>
        ({
          required: '入力してください。',
          invalid_email: 'メールアドレスの形式で入力してください。',
          too_long: '文字数が多すぎます。',
        })[code],
    },
    footerNote: 'モバイルアプリ開発のご相談はいつでもどうぞ。',
  },
  en: {
    overview: 'Overview',
    technicalBackground: 'Background',
    specialties: 'What I do best',
    talks: 'Talks',
    communities: 'Community',
    experience: 'Experience',
    sideProjects: 'Side Projects',
    personalApps: 'Personal Apps',
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
    nav: {
      apps: 'Apps',
      about: 'About',
      contact: 'Contact',
      home: 'Home',
      personal: 'Personal',
      articles: 'Articles',
    },
    hero: {
      headline: 'Apps, built solo.',
      stack: 'iOS · Android · Go',
      lead: 'From the first idea through architecture, implementation, App Store review and everything that comes after release. I lead iOS by day and do all of it myself on the side.',
      primaryCta: 'Start a project',
      secondaryCta: 'See the apps',
      stats: (releasedAppCount) => [
        { value: releasedAppCount, label: 'Personal apps on the stores' },
        {
          value: 4.2,
          decimals: 1,
          label: 'App Store rating, Simple Voice Recorder (229 reviews)',
        },
        { value: 10, suffix: '+', label: 'Years building software' },
      ],
    },
    apps: {
      eyebrow: 'Personal Apps',
      title: 'Apps I ship',
      lead: 'Apps I design and publish to the App Store and Google Play on my own, outside of work.',
      unreleased: 'Not published',
      highlights: 'Highlights',
      placeholder: 'Not on the store',
      prototypes: 'Prototypes',
    },
    about: {
      eyebrow: 'About',
      title: 'What I can do for you',
    },
    more: {
      eyebrow: 'More',
      title: 'Work so far',
      lead: 'Experience, talks and community work — open whichever you want to read.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Start a project',
      lead: 'New iOS or Android apps, improving an app you already have, or just a technical question. A rough outline is enough to start.',
      name: 'Your name',
      namePlaceholder: 'Jane Doe',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      budget: 'Budget',
      budgetPlaceholder: 'Not decided / under $5k / $5k–15k …',
      message: 'What would you like to build?',
      messagePlaceholder:
        'Tell me what you have in mind, where the project stands today and the timeline you are hoping for.',
      required: 'Required',
      optional: 'Optional',
      submit: 'Send',
      submitting: 'Sending…',
      success: 'Thanks — your message is on its way.',
      successDetail: "I'll get back to you within two business days.",
      invalid: 'Please check the fields above.',
      error: 'Sending failed. Please try again in a moment.',
      notConfigured:
        'The form is not accepting messages yet. Please reach me on X or GitHub in the meantime.',
      rateLimited: 'Too many messages in a row. Please try again a bit later.',
      privacy: 'I use what you send only to reply to your enquiry.',
      honeypot: 'Leave this field empty',
      fieldError: (code) =>
        ({
          required: 'This field is required.',
          invalid_email: 'Please enter a valid email address.',
          too_long: 'This is too long.',
        })[code],
    },
    footerNote: 'Always happy to talk about a mobile app.',
  },
}

export default labels
