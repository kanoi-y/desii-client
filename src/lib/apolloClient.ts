import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import 'cross-fetch/polyfill'
import { AppProps } from 'next/app'
import { parseCookies } from 'nookies'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

const httpLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
})

const authLink = setContext((_, { headers }) => {
  const cookies = parseCookies()

  const token = cookies['access-token']
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}
export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps']
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}
