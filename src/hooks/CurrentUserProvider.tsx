import { useSession } from 'next-auth/react'
import { createContext, FC, ReactNode } from 'react'
import { User } from '~/types/generated/graphql'

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
  const isLoading = status === 'loading'

  return (
    <CurrentUserContext.Provider
      value={{ currentUser: session?.user, isLoading }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
}
