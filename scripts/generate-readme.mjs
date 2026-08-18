#!/usr/bin/env node
/**
 * content/profile.<lang>.json から README を生成する。
 *
 *   node scripts/generate-readme.mjs          README.md / README.en.md を書き出す
 *   node scripts/generate-readme.mjs --check  生成結果と実ファイルが一致するか検証する
 *
 * README（GitHubプロフィール）と entaku.dev のページは同じ JSON を参照しているため、
 * 内容は常に一致する。日本語は `/`、英語は `/en` に対応する。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')

const TARGETS = [
  {
    lang: 'ja',
    source: 'profile.ja.json',
    output: 'README.md',
    otherLangLine: '*English version: [README.en.md](README.en.md)*',
    headings: {
      about: '# 概要',
      background: '## 技術略歴',
      specialties: '## 得意なこと',
      output: '# 主なアウトプット',
      talks: '## 登壇',
      communities: '## コミュニティ活動',
      experience: '## 略歴',
      projectOverview: '#### プロジェクト概要',
      highlights: '#### 実績・取り組み',
      deliverables: '#### 主な成果物',
      tech: '#### 利用技術',
      sideProjects: '## SideProject',
      sideHighlights: '**実績・取り組み**',
      sideTech: '**利用技術:**',
      personalApps: '## 個人開発',
      personalAppTech: '**利用技術:**',
      more: '# その他',
      personalLine: '- 私自身に関することはこちら  ',
      personalFile: 'personal.md',
    },
    talkLine: (talk) => `- ${talk.event}で「${talk.title}」登壇`,
  },
  {
    lang: 'en',
    source: 'profile.en.json',
    output: 'README.en.md',
    otherLangLine: '*日本語版: [README.md](README.md)*',
    headings: {
      about: '# About',
      background: '## Background',
      specialties: '## What I do best',
      output: '# Output',
      talks: '## Talks',
      communities: '## Community',
      experience: '## Experience',
      projectOverview: '#### Project overview',
      highlights: '#### Highlights',
      deliverables: '#### Deliverables',
      tech: '#### Tech stack',
      sideProjects: '## Side Projects',
      sideHighlights: '**Highlights**',
      sideTech: '**Tech stack:**',
      personalApps: '## Personal Apps',
      personalAppTech: '**Tech stack:**',
      more: '# More',
      personalLine: '- More about me  ',
      personalFile: 'personal.en.md',
    },
    talkLine: (talk) => `- “${talk.title}” at ${talk.event}`,
  },
]

const buildReadme = ({ source, otherLangLine, headings, talkLine }) => {
  const profile = JSON.parse(
    readFileSync(join(rootDir, 'content', source), 'utf8'),
  )

  const lines = []
  const push = (...values) => lines.push(...values)
  const blank = () => {
    if (lines.length > 0 && lines[lines.length - 1] !== '') push('')
  }
  const section = (heading) => {
    blank()
    push(heading, '')
  }

  section(headings.about)
  push(otherLangLine, '')
  for (const paragraph of profile.summary) {
    push(paragraph, '')
  }

  section(headings.background)
  for (const item of profile.technicalBackground) push(`- ${item}`)

  section(headings.specialties)
  for (const item of profile.specialties) push(`- ${item}`)

  section(headings.output)

  section(headings.talks)
  for (const talk of profile.talks) {
    push(talkLine(talk))
    const links = talk.links.map((link) => `[${link.label}](${link.url})`)
    push(`  ${links.join(' / ')}`)
  }

  section(headings.communities)
  for (const community of profile.communities) {
    push(`- **${community.name}** ${community.role}`)
    push(`  ${community.description}`)
    push(`  [${community.name}](${community.url})`)
  }

  blank()
  push(
    `[![trophy](https://github-profile-trophy.vercel.app/?username=${profile.githubUsername}&theme=light)](${profile.githubUrl})`,
    '',
  )

  section(headings.experience)
  for (const experience of profile.experiences) {
    section(`### ${experience.company} (${experience.period})`)
    push(`[${experience.company} Website](${experience.url})`, '')

    section(headings.projectOverview)
    push(experience.overview, '')

    section(headings.highlights)
    for (const highlight of experience.highlights) {
      if (highlight.title) {
        push(`**${highlight.title}**`, '')
      }
      for (const point of highlight.points) push(`- ${point}`)
      push('')
    }

    if (experience.deliverables) {
      section(headings.deliverables)
      for (const deliverable of experience.deliverables) {
        const suffix = deliverable.description
          ? ` - ${deliverable.description}`
          : ''
        push(`- [${deliverable.name}](${deliverable.url})${suffix}`)
      }
      push('')
    }

    section(headings.tech)
    for (const category of experience.tech) {
      push(`- ${category.label}: ${category.items.join(' / ')}`)
    }
    push('')
  }

  section(headings.sideProjects)
  for (const project of profile.sideProjects) {
    section(`### ${project.title} (${project.period})`)
    if (project.url) {
      push(`[${project.siteName ?? project.title} Website](${project.url})`, '')
    }
    push(project.overview, '')
    push(headings.sideHighlights, '')
    for (const point of project.points) push(`- ${point}`)
    push('')
    if (project.tech) {
      push(`${headings.sideTech} ${project.tech.join(' / ')}`, '')
    }
  }

  section(headings.personalApps)
  for (const app of profile.personalApps) {
    section(`### ${app.name} (${app.platform})`)
    push(app.overview, '')
    push(`${headings.personalAppTech} ${app.tech.join(' / ')}`, '')
    if (app.links.length > 0) {
      push(
        app.links.map((link) => `[${link.label}](${link.url})`).join(' / '),
        '',
      )
    }
  }

  section(headings.more)
  push(
    headings.personalLine,
    `  [${headings.personalFile}](${headings.personalFile})`,
    '',
  )

  return `${lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd()}\n`
}

const check = process.argv.includes('--check')
let mismatched = false

for (const target of TARGETS) {
  const generated = buildReadme(target)
  const outputPath = join(rootDir, target.output)

  if (check) {
    const current = readFileSync(outputPath, 'utf8')
    if (current !== generated) {
      console.error(
        `${target.output} が content/${target.source} と一致していません。\`yarn readme\` を実行してコミットしてください。`,
      )
      mismatched = true
    } else {
      console.log(
        `${target.output} は content/${target.source} と一致しています。`,
      )
    }
  } else {
    writeFileSync(outputPath, generated)
    console.log(
      `${target.output} を content/${target.source} から生成しました。`,
    )
  }
}

if (mismatched) process.exit(1)
