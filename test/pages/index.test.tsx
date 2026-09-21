import React from 'react'
import { render, within } from '../testUtils'
import { Home } from '../../pages/index'
import { featuredApps, profileJa, releasedApps } from '../../content/profile'
import labels from '../../content/labels'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the profile name', () => {
    const { getByText } = render(<Home />, {})
    expect(getByText('entaku')).toBeTruthy()
  })

  it('leads with the headline and the stack', () => {
    const { getByRole, getByText } = render(<Home />, {})
    expect(getByRole('heading', { level: 1 }).textContent).toBe(
      labels.ja.hero.headline,
    )
    expect(getByText(labels.ja.hero.stack)).toBeTruthy()
  })

  it('points the hero call to action at the apps', () => {
    const { getAllByRole } = render(<Home />, {})
    const cta = getAllByRole('link', {
      name: new RegExp(labels.ja.hero.secondaryCta),
    })
    expect(cta.length).toBeGreaterThan(0)
    expect(cta.every((link) => link.getAttribute('href') === '#apps')).toBe(
      true,
    )
  })

  it('counts only the apps that are on a store in the hero stats', () => {
    const { getByText } = render(<Home />, {})
    const [appCountStat] = labels.ja.hero.stats(releasedApps(profileJa).length)

    expect(releasedApps(profileJa)).toHaveLength(6)
    expect(getByText(appCountStat.label)).toBeTruthy()
    expect(getByText(String(appCountStat.value))).toBeTruthy()
  })

  it('shows every personal app with its name as a heading, in data order', () => {
    const { container } = render(<Home />, {})
    const headings = within(container.querySelector('#apps'))
      .queryAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent)

    expect(headings).toEqual(featuredApps(profileJa).map((app) => app.name))
    expect(headings.indexOf('ClipKit - コピー履歴管理')).toBe(1)
  })

  it('links each released app to its store page', () => {
    const { getAllByRole } = render(<Home />, {})
    const storeLinks = getAllByRole('link', { name: /App Store|Google Play/ })
      .map((link) => link.getAttribute('href'))
      .filter(
        (href) =>
          href?.includes('apps.apple.com') || href?.includes('play.google.com'),
      )

    expect(storeLinks).toHaveLength(
      featuredApps(profileJa).flatMap((app) => app.links).length,
    )
    expect(storeLinks).toContain('https://apps.apple.com/jp/app/id6759832862')
  })

  it('gives each featured app its own full-width section, in data order', () => {
    const { container } = render(<Home />, {})
    const sections = Array.from(container.querySelectorAll('section[data-app]'))

    expect(sections.map((section) => section.getAttribute('data-app'))).toEqual(
      featuredApps(profileJa).map((app) => app.name),
    )
  })

  it('keeps the apps that are only in the README off the site', () => {
    const { container } = render(<Home />, {})
    const onSite = Array.from(container.querySelectorAll('[data-app]')).map(
      (section) => section.getAttribute('data-app'),
    )
    const readmeOnly = profileJa.personalApps.filter((app) => !app.featured)

    // README には6本、サイトには3本
    expect(profileJa.personalApps).toHaveLength(6)
    expect(readmeOnly).toHaveLength(3)
    for (const app of readmeOnly) {
      expect(onSite).not.toContain(app.name)
      // サイトに出さないものはスクショも持たない（消した画像を参照しない）
      expect(app.screenshot).toBeUndefined()
    }
  })

  it('alternates which side the device mock sits on', () => {
    const { container } = render(<Home />, {})
    const sections = Array.from(container.querySelectorAll('section[data-app]'))

    // 奇数番のセクションだけ端末を右に寄せる（lg:order-2 が付く）
    const deviceOnRight = sections.map((section) =>
      Boolean(section.querySelector('.lg\\:order-2')),
    )
    expect(deviceOnRight).toEqual([false, true, false])
  })

  it('shows a real screenshot inside the device mock for released apps', () => {
    const { container } = render(<Home />, {})
    const clipkit = container.querySelector(
      '[data-app="ClipKit - コピー履歴管理"]',
    )
    const image = clipkit?.querySelector('img')

    expect(image).toBeTruthy()
    expect(image?.getAttribute('src')).toContain('clipkit')
    expect(image?.getAttribute('alt')).toContain('ClipKit')
  })

  it('shows a real screenshot in every device mock', () => {
    const { container } = render(<Home />, {})
    const shown = container.querySelectorAll('[data-app]')

    // 載せるアプリは必ずスクショを持つ（プレースホルダは出番なし）
    expect(container.querySelectorAll('[data-app] img')).toHaveLength(
      shown.length,
    )
  })

  it('folds the long-form history into collapsed sections', () => {
    const { container, getByText } = render(<Home />, {})
    const summaries = Array.from(container.querySelectorAll('details summary'))

    expect(summaries.map((summary) => summary.textContent)).toEqual(
      expect.arrayContaining([
        expect.stringContaining(labels.ja.experience),
        expect.stringContaining(labels.ja.talks),
        expect.stringContaining(labels.ja.communities),
      ]),
    )
    // details は既定で閉じている＝畳まれた状態で描画される
    expect(container.querySelectorAll('details[open]')).toHaveLength(0)
    expect(getByText(labels.ja.more.title)).toBeTruthy()
  })

  it('renders the contact form', () => {
    const { getByLabelText, getByRole } = render(<Home />, {})
    expect(getByLabelText(new RegExp(labels.ja.contact.name))).toBeTruthy()
    expect(getByLabelText(new RegExp(labels.ja.contact.message))).toBeTruthy()
    expect(
      getByRole('button', { name: new RegExp(labels.ja.contact.submit) }),
    ).toBeTruthy()
  })

  it('keeps every #contact link pointing at a section that exists', () => {
    const { container } = render(<Home />, {})
    const anchors = container.querySelectorAll('a[href="#contact"]')

    expect(anchors.length).toBeGreaterThan(0)
    expect(container.querySelector('#contact')).toBeTruthy()
  })
})
