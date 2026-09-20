import React from 'react'
import { render, within } from '../testUtils'
import { Home } from '../../pages/index'
import { profileJa, releasedApps } from '../../content/profile'
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

  it('puts a contact call to action directly under the hero', () => {
    const { getAllByRole } = render(<Home />, {})
    const cta = getAllByRole('link', {
      name: new RegExp(labels.ja.hero.primaryCta),
    })
    expect(cta.length).toBeGreaterThan(0)
    expect(cta.every((link) => link.getAttribute('href') === '#contact')).toBe(
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

    for (const app of profileJa.personalApps) {
      expect(headings).toContain(app.name)
    }
    expect(headings.indexOf('ClipKit - コピー履歴管理')).toBe(1)
    expect(headings.indexOf('韻を踏んだらいいんじゃない')).toBe(
      profileJa.personalApps.length - 1,
    )
  })

  it('links each released app to its store page', () => {
    const { getAllByRole } = render(<Home />, {})
    const storeLinks = getAllByRole('link', { name: /App Store/ }).map((link) =>
      link.getAttribute('href'),
    )

    expect(storeLinks).toContain('https://apps.apple.com/jp/app/id6759832862')
    expect(storeLinks).toContain('https://apps.apple.com/jp/app/id6770225144')
    expect(storeLinks).toContain('https://apps.apple.com/jp/app/id6763427429')
  })

  it('gives each released app its own full-width section, in data order', () => {
    const { container } = render(<Home />, {})
    const sections = Array.from(container.querySelectorAll('section[data-app]'))

    expect(sections.map((section) => section.getAttribute('data-app'))).toEqual(
      releasedApps(profileJa).map((app) => app.name),
    )
  })

  it('alternates which side the device mock sits on', () => {
    const { container } = render(<Home />, {})
    const sections = Array.from(container.querySelectorAll('section[data-app]'))

    // 奇数番のセクションだけ端末を右に寄せる（lg:order-2 が付く）
    const deviceOnRight = sections.map((section) =>
      Boolean(section.querySelector('.lg\\:order-2')),
    )
    expect(deviceOnRight.slice(0, 4)).toEqual([false, true, false, true])
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

  it('lists the app that never shipped compactly instead of giving it a section', () => {
    const { container, getByText } = render(<Home />, {})
    const unreleased = container.querySelector(
      '[data-app="韻を踏んだらいいんじゃない"]',
    )

    expect(unreleased).toBeTruthy()
    // フル幅のセクションではなく、末尾のまとめブロックの項目として出す
    expect(unreleased?.tagName).toBe('LI')
    expect(unreleased?.closest('section[data-app]')).toBeNull()
    expect(unreleased?.querySelector('img')).toBeNull()
    expect(unreleased?.querySelectorAll('a[target="_blank"]')).toHaveLength(0)
    expect(unreleased?.textContent).toContain(labels.ja.apps.unreleased)
    expect(getByText(labels.ja.apps.prototypes)).toBeTruthy()
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
})
