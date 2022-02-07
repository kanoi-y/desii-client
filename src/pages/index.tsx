import { Box } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Button, Text } from '~/components/parts/commons'
import { useUsersQuery } from '~/types/generated/graphql'

export default function Home() {
  const handleClick = () => {
    alert('Hello!')
  }

  const { data: session } = useSession()

  const { data, error } = useUsersQuery({
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    return <p>error</p>
  }

  return (
    <>
      <Box textAlign="center">
        <Button onClick={handleClick}>Hello World!!</Button>
        <Text fontSize="lg" isHead>
          Desii
        </Text>
        {data?.users.map((user, i) =>
          user ? (
            <UserIcon key={i} user={user} />
          ) : (
            <GuestUserIcon key={i} size="md" />
          )
        )}
      </Box>
      <Box>
        {session ? (
          <>
            <p>Signed in as {session.user?.name}</p>
            <Button onClick={() => signOut()}>Sign out</Button>
          </>
        ) : (
          <>
            <p>Not signed in</p>
            <Button onClick={() => signIn('google')}>Sign in</Button>
          </>
        )}
      </Box>
    </>
  )
}
