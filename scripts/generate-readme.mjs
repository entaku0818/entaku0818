#!/usr/bin/env node
/**
 * content/profile.json から README.md を生成する。
 *
 *   node scripts/generate-readme.mjs          README.md を書き出す
 *   node scripts/generate-readme.mjs --check  生成結果と README.md が一致するか検証する
 *
 * README.md（GitHubプロフィール）と entaku.dev のトップページは
 * 同じ content/profile.json を参照しているため、内容は常に一致する。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const profilePath = join(rootDir, 'content', 'profile.json')
const readmePath = join(rootDir, 'README.md')

const profile = JSON.parse(readFileSync(profilePath, 'utf8'))

const lines = []
const push = (...values) => lines.push(...values)
const blank = () => {
  if (lines.length > 0 && lines[lines.length - 1] !== '') push('')
}
const section = (heading) => {
  blank()
  push(heading, '')
}

// 概要
section('# 概要')
for (const paragraph of profile.summary) {
  push(paragraph, '')
}

section('## 技術略歴')
for (const item of profile.technicalBackground) push(`- ${item}`)

section('## 得意なこと')
for (const item of profile.specialties) push(`- ${item}`)

// 主なアウトプット
section('# 主なアウトプット')

section('## 登壇')
for (const talk of profile.talks) {
  push(`- ${talk.event}で「${talk.title}」登壇`)
  const links = talk.links.map((link) => `[${link.label}](${link.url})`)
  push(`  ${links.join(' / ')}`)
}

section('## コミュニティ活動')
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

// 略歴
section('## 略歴')
for (const experience of profile.experiences) {
  section(`### ${experience.company} (${experience.period})`)
  push(`[${experience.company} Website](${experience.url})`, '')

  section('#### プロジェクト概要')
  push(experience.overview, '')

  section('#### 実績・取り組み')
  for (const highlight of experience.highlights) {
    if (highlight.title) {
      push(`**${highlight.title}**`, '')
    }
    for (const point of highlight.points) push(`- ${point}`)
    push('')
  }

  if (experience.deliverables) {
    section('#### 主な成果物')
    for (const deliverable of experience.deliverables) {
      const suffix = deliverable.description
        ? ` - ${deliverable.description}`
        : ''
      push(`- [${deliverable.name}](${deliverable.url})${suffix}`)
    }
    push('')
  }

  section('#### 利用技術')
  for (const category of experience.tech) {
    push(`- ${category.label}: ${category.items.join(' / ')}`)
  }
  push('')
}

// SideProject
section('## SideProject')
for (const project of profile.sideProjects) {
  section(`### ${project.title} (${project.period})`)
  if (project.url) {
    push(`[${project.siteName ?? project.title} Website](${project.url})`, '')
  }
  push(project.overview, '')
  push('**実績・取り組み**', '')
  for (const point of project.points) push(`- ${point}`)
  push('')
  if (project.tech) {
    push(`**利用技術:** ${project.tech.join(' / ')}`, '')
  }
}

// その他
section('# その他')
push('- 私自身に関することはこちら  ', '  [personal.md](personal.md)', '')

const generated = `${lines
  .join('\n')
  .replace(/\n{3,}/g, '\n\n')
  .trimEnd()}\n`

if (process.argv.includes('--check')) {
  const current = readFileSync(readmePath, 'utf8')
  if (current !== generated) {
    console.error(
      'README.md が content/profile.json と一致していません。`yarn readme` を実行してコミットしてください。',
    )
    process.exit(1)
  }
  console.log('README.md は content/profile.json と一致しています。')
} else {
  writeFileSync(readmePath, generated)
  console.log('README.md を content/profile.json から生成しました。')
}
