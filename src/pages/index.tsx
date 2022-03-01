import { Box } from '@chakra-ui/react'
import { signIn, signOut } from 'next-auth/react'
import React, { useContext } from 'react'
import { PostCard, SkeletonPostCard } from '~/components/domains/post/PostCard'
import { UserIcon } from '~/components/domains/user/UserIcon'
import { Button, Text } from '~/components/parts/commons'
import { CurrentUserContext } from '~/hooks/CurrentUserProvider'
import { OrderByType, useGetPostsQuery } from '~/types/generated/graphql'

export default function Home() {
  const { currentUser, isLoading } = useContext(CurrentUserContext)

  const { data } = useGetPostsQuery({
    variables: {
      isPrivate: false,
      sort: OrderByType.Desc,
    },
  })

  if (isLoading) {
    return <p>loading...</p>
  }

  return (
    <Box maxW="1200px" mx="auto">
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
      <Box my="24px">
        <Text fontSize="lg" isHead>
          新着
        </Text>
      </Box>
      <Box w="360px" display="flex" flexDirection="column" gap="16px">
        {data ? (
          data.GetPosts.map((post) => (
            <PostCard
              key={post.id}
              currentUserId={currentUser?.id}
              post={post}
              isLink
            />
          ))
        ) : (
          <SkeletonPostCard />
        )}
      </Box>
    </Box>
  )
}
