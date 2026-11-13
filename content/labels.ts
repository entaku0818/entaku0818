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
  timeline: string
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
    services: string
    contact: string
    home: string
    personal: string
    articles: string
  }
  hero: {
    availability: string
    reassurance: string
    credibility: string
    headline: string
    stack: string
    lead: string
    primaryCta: string
    secondaryCta: string
    /** 配信中アプリの本数は personalApps から数えるので引数で受ける */
    stats: (releasedAppCount: number) => HeroStat[]
  }
  services: {
    eyebrow: string
    title: string
    lead: string
    cta: string
    items: { title: string; description: string; proof: string }[]
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
    timeline: '年表',
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
      about: 'プロフィール',
      services: 'ご依頼できること',
      contact: 'ご相談',
      home: 'Home',
      personal: 'Personal',
      articles: 'Articles',
    },
    hero: {
      availability: '副業・業務委託の開発相談を受付中',
      reassurance: '要件・ご予算が未定でも、お気軽にご相談ください。',
      credibility:
        'TVerでiOSリードを担当。Voicyでの収録アプリ開発、whooなどの業務委託案件も経験。',
      headline: 'アプリ開発の課題を、一緒に前へ。',
      stack: 'iOS ・ Android ・ Go',
      lead: '新規アプリの立ち上げから、既存アプリの機能追加・品質改善まで。iOSを中心に、Android・Goのバックエンドも含めて、設計から実装・リリースまで支援します。',
      primaryCta: '開発について相談する',
      secondaryCta: '個人開発を見る',
      stats: (releasedAppCount) => [
        {
          value: releasedAppCount,
          suffix: '本',
          label: 'ここで紹介する個人開発アプリ',
        },
        {
          value: 4.2,
          decimals: 1,
          label: 'シンプル録音の評価（日本・214件／2026年10月22日）',
        },
        { value: 13, suffix: '年+', label: 'ソフトウェア開発歴' },
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'こんな開発をお手伝いできます',
      lead: '新しいプロダクトの立ち上げも、開発中のチームへの参画も。お困りごとに合わせて、担当範囲や進め方をご相談できます。',
      cta: 'この内容で相談する',
      items: [
        {
          title: '新規アプリ・MVPの開発',
          description:
            '「作りたいものはあるけれど、何から始めればいいか」。必要な機能を整理し、設計・実装からストア公開まで進めます。',
          proof:
            '個人でも複数のアプリを企画・開発・ストア公開し、運用しています。',
        },
        {
          title: '既存アプリの機能追加・品質改善',
          description:
            '「開発の手が足りない」「改修のたびに不具合が出る」。既存コードを読み解き、機能追加やSwiftUIへの移行、テスト整備を支援します。',
          proof:
            'Voicyでは収録アプリの内製化をリード。リリース後の不具合報告を約40%削減。',
        },
        {
          title: '音声・動画機能の設計と実装',
          description:
            '録音・再生・ライブ配信など、メディア機能の開発に対応。アプリとバックエンドをまたぐ機能もご相談ください。',
          proof:
            'TVerで動画再生・広告連携、Voicyでコラボ収録・生放送機能を開発。',
        },
      ],
    },
    apps: {
      eyebrow: 'Personal Apps',
      title: '個人開発',
      lead: '企画から実装、課金機能、ストア公開・運用まで。自分で作り、届けているアプリをご紹介します。',
      unreleased: '未配信',
      highlights: '見どころ',
      placeholder: 'ストア未配信',
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
      lead: '「こんなことを頼める？」という段階からどうぞ。業務委託でのチーム参画や、機能単位の開発など、まずは現在のお困りごとをお聞かせください。',
      name: 'お名前',
      namePlaceholder: '山田 太郎',
      email: '連絡先メールアドレス',
      emailPlaceholder: 'you@example.com',
      budget: 'ご予算感',
      budgetPlaceholder: '未定 / 〜50万円 / 50〜150万円 など',
      message: 'ご相談内容',
      messagePlaceholder:
        '例：開発中のiOSアプリに録音機能を追加したいです。既存チームと一緒に進められる方を探しています。予算や時期は相談したいです。',
      required: '必須',
      optional: '任意',
      submit: '相談内容を送る',
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
    technicalBackground: 'Tech stack',
    timeline: 'Timeline',
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
      services: 'Services',
      contact: 'Contact',
      home: 'Home',
      personal: 'Personal',
      articles: 'Articles',
    },
    hero: {
      availability: 'Available for freelance project enquiries',
      reassurance: 'You can reach out before your scope or budget is decided.',
      credibility:
        'iOS lead at TVer, with recording app experience at Voicy and freelance work on whoo.',
      headline: 'Move your app project forward.',
      stack: 'iOS · Android · Go',
      lead: 'From launching an app to adding features and improving quality. I help with architecture, implementation and release, focused on iOS with Android and Go backend experience.',
      primaryCta: 'Start a project',
      secondaryCta: 'See the apps',
      stats: (releasedAppCount) => [
        { value: releasedAppCount, label: 'Featured personal apps' },
        {
          value: 4.2,
          decimals: 1,
          label:
            'Simple Voice Recorder rating (Japan, 214 ratings; Oct 22, 2026)',
        },
        { value: 13, suffix: '+', label: 'Years building software' },
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'How I can help',
      lead: 'Launching a product or joining an existing team: we can discuss the scope and approach that fit your project.',
      cta: 'Discuss your project',
      items: [
        {
          title: 'New apps and MVPs',
          description:
            'Turn an idea into a focused first release, from defining features and architecture to implementation and store submission.',
          proof:
            'I independently plan, build, publish and maintain multiple apps.',
        },
        {
          title: 'Features and app quality',
          description:
            'Add development capacity to your team, extend existing code, migrate to SwiftUI or improve test coverage.',
          proof:
            'Led in-house recording app development at Voicy, reducing post-release bug reports by about 40%.',
        },
        {
          title: 'Audio and video features',
          description:
            'Recording, playback and live streaming, including features that span the mobile app and backend.',
          proof:
            'Video playback and ads at TVer; collaborative recording and live audio at Voicy.',
        },
      ],
    },
    apps: {
      eyebrow: 'Personal Apps',
      title: 'Apps I ship',
      lead: 'Apps I design and publish to the App Store and Google Play on my own, outside of work.',
      unreleased: 'Not published',
      highlights: 'Highlights',
      placeholder: 'Not on the store',
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
      lead: 'Have a project in mind? Tell me what you need help with. We can discuss joining your team on a freelance basis or developing a specific feature, even before the scope and budget are decided.',
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
