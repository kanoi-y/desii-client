import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { NavigationBar } from '~/components/parts/layout/NavigationBar'
import { CurrentUserProvider, LoginModalProvider } from '~/hooks'
import { initializeApollo } from '~/lib/apolloClient'
import { theme } from '~/theme'

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextPage
  pageProps: { session: Session; children?: ReactNode }
}): JSX.Element {
  const client = initializeApollo()

  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <CurrentUserProvider>
            <LoginModalProvider>
              <NavigationBar />
              <Component {...pageProps} />
            </LoginModalProvider>
          </CurrentUserProvider>
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default MyApp
