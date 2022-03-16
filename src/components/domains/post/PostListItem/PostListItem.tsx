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
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Tag
          text={post.category === 'GIVE_ME' ? 'してほしいこと' : '出来ること'}
          bgColor="orange.main"
          size="sm"
        />
        <Text fontSize="lg" isBold noOfLines={2}>
          {post.title}
        </Text>
        <Box display="flex" alignItems="center" gap="8px">
          {userData?.getUser ? (
            <>
              <Box onClick={() => router.push(`/user/${post.createdUserId}`)}>
                <UserIcon user={userData.getUser} size="sm" />
              </Box>
              <Box>
                <Box onClick={() => router.push(`/user/${post.createdUserId}`)}>
                  <Text fontSize="md" isBold>
                    {userData.getUser.name}
                  </Text>
                </Box>
                <Text fontSize="xs">{displayDate}</Text>
              </Box>
            </>
          ) : (
            <>
              <GuestUserIcon size="sm" />
              <SkeletonText w="40px" noOfLines={2} spacing="2" />
            </>
          )}
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
