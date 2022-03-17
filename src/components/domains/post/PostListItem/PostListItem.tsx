import { Box, SkeletonText } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { VFC } from 'react'
import { PostFavoriteButton } from '~/components/domains/post/PostFavoriteButton'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Tag, Text } from '~/components/parts/commons'
import { Post, useGetUserQuery } from '~/types/generated/graphql'
import { formatDistanceToNow } from '~/utils/formatDistanceToNow'

type Props = {
  post: Post
  currentUserId?: string
  isLink?: boolean
}

export const PostListItem: VFC<Props> = ({
  post,
  currentUserId,
  isLink = false,
}) => {
  const router = useRouter()

  const { data: userData } = useGetUserQuery({
    variables: {
      getUserId: post.createdUserId,
    },
  })

  const displayDate = formatDistanceToNow(new Date(post.createdAt))

  return (
    <Box
      p="12px"
      display="flex"
      alignItems="flex-end"
      justifyContent="space-between"
      borderBottom="2px solid"
      borderColor="secondary.light"
    >
      <Box>
        <Box display="flex" alignItems="center" gap="8px" mb="4px">
          {userData?.getUser ? (
            <>
              <Box onClick={() => router.push(`/user/${post.createdUserId}`)}>
                <UserIcon user={userData.getUser} size="xs" />
              </Box>
              <Box onClick={() => router.push(`/user/${post.createdUserId}`)}>
                <Text fontSize="sm" isBold color="primary.main">
                  {userData.getUser.name}
                </Text>
              </Box>
              <Text fontSize="xs">{displayDate}</Text>
            </>
          ) : (
            <>
              <GuestUserIcon size="xs" />
              <SkeletonText w="40px" noOfLines={2} spacing="2" />
            </>
          )}
        </Box>
        <Text fontSize="md" isBold noOfLines={2}>
          {post.title}
        </Text>
        <Box mt="8px">
          <Tag
            text={post.category === 'GIVE_ME' ? 'してほしいこと' : '出来ること'}
            bgColor="orange.main"
            size="sm"
          />
        </Box>
      </Box>
      <PostFavoriteButton
        postId={post.id}
        currentUserId={currentUserId}
        existCount
      />
    </Box>
  )
}
