import React from 'react'
import { render } from '../testUtils'
import { Home } from '../../pages/index'

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

  it('links back to the Japanese page', () => {
    const { getByText } = render(<Home lang="en" />, {})
    expect(getByText('日本語').getAttribute('href')).toBe('/')
  })

  it('keeps the /en prefix on its own navigation', () => {
    const { getByText } = render(<Home lang="en" />, {})
    expect(getByText('Personal').getAttribute('href')).toBe('/en/personal')
  })
})
