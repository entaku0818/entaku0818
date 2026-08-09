import React from 'react'
import { render } from '../testUtils'
import { EnglishHome } from '../../pages/en/index'

describe('English home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<EnglishHome />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the English role', () => {
    const { getAllByText } = render(<EnglishHome />, {})
    expect(
      getAllByText('Senior iOS Engineer — Video Streaming & Ad Tech').length,
    ).toBeGreaterThan(0)
  })

  it('links back to the Japanese page', () => {
    const { getByText } = render(<EnglishHome />, {})
    expect(getByText('日本語').getAttribute('href')).toBe('/')
  })
})
