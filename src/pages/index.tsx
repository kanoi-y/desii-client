import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { UserIcon } from '~/components/domains/user/UserIcon'
import { Button } from '~/components/parts/commons'
import { GET_USERS } from '~/queries'
import { GetUsersQuery } from '~/types/generated/graphql'

export default function Home() {
  const handleClick = () => {
    alert('Hello!')
  }

  const { data: session } = useSession()

  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    // fetchPolicy: 'network-only',
    fetchPolicy: 'cache-and-network',
    //fetchPolicy: 'cache-first',
    //fetchPolicy: 'no-cache',
  })

  if (error) {
    return <p>error</p>
  }

  return (
    <>
      <Box textAlign="center">
        <Button onClick={handleClick}>Hello World!!</Button>
        {data?.users.map((user) => (
          <UserIcon
            key={user._id}
            userName={user.name}
            iconImageId={user.iconImageId}
            userId={user._id}
          />
        ))}
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
