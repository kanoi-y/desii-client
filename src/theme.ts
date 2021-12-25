import { extendTheme, theme as baseTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    primary: {
      main: baseTheme.colors.green[200],
      light: baseTheme.colors.green[50],
    },
    secondary: {
      main: baseTheme.colors.gray[200],
      light: baseTheme.colors.gray[50],
    },
    error: {
      main: baseTheme.colors.red[400],
    },
    text: {
      main: '#505050',
    },
  },
})
