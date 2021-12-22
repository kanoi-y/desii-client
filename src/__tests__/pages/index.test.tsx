import React from 'react'
import Home from 'src/pages'
import { render } from '../utils'

test('ホームページ', () => {
  const { container } = render(<Home />)
  expect(container).toMatchSnapshot()
})
