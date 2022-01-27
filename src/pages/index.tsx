import { Box } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Button } from '~/components/parts/commons'
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
        {data?.users.map((user) =>
          user?.image ? (
            <UserIcon
              key={user.id}
              userName={user.name}
              imageSrc={user.image}
              userId={user.id}
            />
          ) : (
            <GuestUserIcon key={user?.id} size="md" />
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
            <Button onClick={() => signIn()}>Sign in</Button>
          </>
        )}
      </Box>
    </>
  )
}
