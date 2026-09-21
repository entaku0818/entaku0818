import React from 'react'
import { render, within } from '../testUtils'
import { Home } from '../../pages/index'
import { featuredApps, profileEn, releasedApps } from '../../content/profile'
import labels from '../../content/labels'

describe('Home page in English', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home lang="en" />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the English role', () => {
    const { getAllByText } = render(<Home lang="en" />, {})
    expect(
      getAllByText('Senior iOS Engineer — Video Streaming & Ad Tech').length,
    ).toBeGreaterThan(0)
  })

  it('uses the English hero copy', () => {
    const { getByRole } = render(<Home lang="en" />, {})
    expect(getByRole('heading', { level: 1 }).textContent).toBe(
      labels.en.hero.headline,
    )
  })

  it('links back to the Japanese page', () => {
    const { getAllByText } = render(<Home lang="en" />, {})
    // ナビはデスクトップ用とモバイル用の2本あるので、どちらも同じ行き先を指す
    const links = getAllByText('日本語')
    expect(links.length).toBeGreaterThan(0)
    expect(links.every((link) => link.getAttribute('href') === '/')).toBe(true)
  })

  it('keeps the /en prefix on its own navigation', () => {
    const { getAllByText } = render(<Home lang="en" />, {})
    const links = getAllByText('Personal')
    expect(links.length).toBeGreaterThan(0)
    expect(
      links.every((link) => link.getAttribute('href') === '/en/personal'),
    ).toBe(true)
  })

  it('keeps the personal apps in step with the Japanese page', () => {
    const { container } = render(<Home lang="en" />, {})
    const headings = within(container.querySelector('#apps'))
      .queryAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent)

    expect(headings).toEqual(featuredApps(profileEn).map((app) => app.name))
    expect(releasedApps(profileEn)).toHaveLength(6)
    expect(featuredApps(profileEn)).toHaveLength(3)
    expect(headings[1]).toBe('ClipKit — Clipboard Manager')
  })

  it('reuses the same screenshots as the Japanese page', () => {
    const { container } = render(<Home lang="en" />, {})
    const sources = Array.from(
      container.querySelectorAll('[data-app] img'),
    ).map((image) => image.getAttribute('src'))

    expect(sources).toHaveLength(3)
    expect(sources.some((src) => src?.includes('clipkit'))).toBe(true)
  })

  it('renders the contact form in English', () => {
    const { getByLabelText } = render(<Home lang="en" />, {})
    expect(getByLabelText(new RegExp(labels.en.contact.message))).toBeTruthy()
  })
})
