import React from 'react'
import { render } from '../testUtils'
import { Home } from '../../pages/index'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the profile name', () => {
    const { getByText } = render(<Home />, {})
    expect(getByText('entaku')).toBeTruthy()
  })
})
