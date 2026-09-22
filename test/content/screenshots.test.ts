import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { featuredApps, profileEn, profileJa } from '../../content/profile'
import type { Lang, Profile } from '../../content/profile'

const PUBLIC_DIR = join(__dirname, '..', '..', 'public')

const profiles: [Lang, Profile][] = [
  ['ja', profileJa],
  ['en', profileEn],
]

describe.each(profiles)('%s のアプリのスクリーンショット', (_lang, profile) => {
  it('profile.json が指している画像が public/ に実在する', () => {
    const missing = profile.personalApps
      .filter((app) => app.screenshot)
      .filter((app) => !existsSync(join(PUBLIC_DIR, app.screenshot)))
      .map((app) => `${app.name} -> ${app.screenshot}`)

    // 画像を消したり名前を変えたりすると端末モックが空になるが、
    // それ以外の方法では気づけないのでここで止める
    expect(missing).toEqual([])
  })

  it('サイトに載せるアプリは必ず画像を持つ', () => {
    const withoutImage = featuredApps(profile)
      .filter((app) => !app.screenshot)
      .map((app) => app.name)

    expect(withoutImage).toEqual([])
  })

  it('画像のパスは public/apps 配下の webp を指す', () => {
    for (const app of profile.personalApps) {
      if (!app.screenshot) continue
      expect(app.screenshot).toMatch(/^\/apps\/[a-z0-9-]+\.webp$/)
    }
  })
})

it('日本語版と英語版が同じ画像を使う', () => {
  const shots = (profile: Profile) =>
    profile.personalApps
      .map((app) => app.screenshot)
      .filter((path): path is string => Boolean(path))
      .sort()

  expect(shots(profileJa)).toEqual(shots(profileEn))
})
