import { Box } from '@chakra-ui/react'
import { signIn, signOut } from 'next-auth/react'
import React, { useContext } from 'react'
import { UserIcon } from '~/components/domains/user/UserIcon'
import { Button, Text } from '~/components/parts/commons'
import { CurrentUserContext } from '~/hooks/CurrentUserProvider'

export default function Home() {
  const { currentUser, isLoading } = useContext(CurrentUserContext)

  if (isLoading) {
    return <p>loading...</p>
  }

  return (
    <Box textAlign="center">
      <Text fontSize="2xl" isHead>
        Desii
      </Text>
      {currentUser ? (
        <Box
          display="flex"
          gap="8px"
          w="100%"
          alignItems="center"
          justifyContent="center"
        >
          <UserIcon user={currentUser} />
          <Button onClick={() => signOut()}>ログアウト</Button>
        </Box>
      ) : (
        <Button onClick={() => signIn('google')}>ログイン</Button>
      )}
    </Box>
  )
}
