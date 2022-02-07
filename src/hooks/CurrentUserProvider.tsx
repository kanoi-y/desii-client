import { useSession } from 'next-auth/react'
import { destroyCookie, setCookie } from 'nookies'
import { createContext, FC, ReactNode, useEffect } from 'react'
import { useGetCurrentUserQuery, User } from '~/types/generated/graphql'

export const CurrentUserContext = createContext<{
  currentUser?: User | null
  isLoading: boolean
}>({
  currentUser: null,
  isLoading: false,
})

export const CurrentUserProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession()
  const accessToken = session?.accessToken

  const { data, loading } = useGetCurrentUserQuery({
    variables: { accessToken: session?.accessToken || '' },
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (status === 'loading') return

    if (!accessToken) {
      destroyCookie(null, 'access-token')
      return
    }

    setCookie(null, 'access-token', accessToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  }, [accessToken, status])

  return (
    <CurrentUserContext.Provider
      value={{ currentUser: data?.getCurrentUser, isLoading: loading }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
}
