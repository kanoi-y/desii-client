import { ChakraProvider } from '@chakra-ui/react'
import { Story } from '@storybook/react'
import * as nextImage from 'next/image'
import React from 'react'
import { theme } from '../src/theme'

if (typeof global.process === 'undefined') {
  const { worker } = require('../src/mocks/browser')

  worker.start()
}

const withChakra = (Story: Story) => {
  return (
    <ChakraProvider theme={theme}>
      <Story />
    </ChakraProvider>
  )
}

export const decorators = [withChakra]

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props: any) => {
    return <img {...props} />
  },
})

const customViewports = {
  /** iPhone X */
  base: {
    name: 'base',
    styles: {
      width: '375px',
      height: '812px',
    },
    type: 'mobile',
  },
  /** iPad */
  md: {
    name: 'md',
    styles: {
      width: '768px',
      height: '1024px',
    },
    type: 'tablet',
  },
  /** MacBook Air */
  lg: {
    name: 'lg',
    styles: {
      width: '1280px',
      height: '800px',
    },
    type: 'desktop',
  },
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: customViewports,
    defaultViewport: 'base',
  },
}
