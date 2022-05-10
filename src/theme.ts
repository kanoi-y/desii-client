import { extendTheme, theme as baseTheme } from '@chakra-ui/react'
import { BREAKPOINTS } from './constants'

export const theme = extendTheme({
  colors: {
    primary: {
      main: baseTheme.colors.green[200],
      light: baseTheme.colors.green[50],
    },
    secondary: {
      main: baseTheme.colors.gray[100],
      light: baseTheme.colors.gray[50],
    },
    error: {
      main: baseTheme.colors.red[400],
    },
    text: {
      main: '#505050',
      light: '#a0aec0',
    },
    white: {
      main: baseTheme.colors.white,
    },
    orange: {
      main: baseTheme.colors.orange[200],
      light: baseTheme.colors.orange[50],
    },
    red: {
      main: baseTheme.colors.red[200],
      light: baseTheme.colors.red[50],
    },
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'secondary.main',
      },
    },
  },
  breakpoints: {
    sm: `${BREAKPOINTS.sm}px`,
    md: `${BREAKPOINTS.md}px`,
  },
})
