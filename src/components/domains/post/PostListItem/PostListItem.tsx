import { Badge, Box, Skeleton, SkeletonText } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMemo, VFC } from 'react'
import { PostFavoriteButton } from '~/components/domains/post/PostFavoriteButton'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import {
  IconButton,
  Link,
  OutlineIcon,
  Tag,
  Text,
} from '~/components/parts/commons'
import { Post, useGetUserQuery } from '~/types/generated/graphql'
import { formatDistanceToNow } from '~/utils/formatDistanceToNow'

type Props = {
  post: Post
  currentUserId?: string
  editable?: boolean
  isLink?: boolean
}

export const SkeletonPostListItem: VFC = () => {
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
          <GuestUserIcon size="xs" />
          <SkeletonText w="40px" noOfLines={1} />
        </Box>
        <SkeletonText w="100px" noOfLines={1} />
        <Skeleton>
          <Box mt="12px">
            <Tag text="してほしいこと" bgColor="orange.main" size="sm" />
          </Box>
        </Skeleton>
      </Box>
      <Box display="flex" alignItems="center" gap="4px">
        <SkeletonText w="20px" noOfLines={1} />
        <IconButton
          icon={<OutlineIcon icon="OUTLINE_STAR" />}
          label="outlineStar"
          isRound
        />
      </Box>
    </Box>
  )
}

export const PostListItem: VFC<Props> = ({
  post,
  currentUserId,
  editable = false,
  isLink = false,
}) => {
  const router = useRouter()

  const { data: userData } = useGetUserQuery({
    variables: {
      getUserId: post.createdUserId,
    },
  })

  const displayDate = formatDistanceToNow(new Date(post.createdAt))

  const PostListItemContent = useMemo(() => {
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
                {editable && (
                  <Badge
                    variant="solid"
                    colorScheme={post.isPrivate ? undefined : 'green'}
                  >
                    {post.isPrivate ? '下書き' : '公開中'}
                  </Badge>
                )}
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
          <Box mt="12px">
            <Tag
              text={
                post.category === 'GIVE_ME' ? 'してほしいこと' : '出来ること'
              }
              bgColor="orange.main"
              size="sm"
            />
          </Box>
        </Box>
        {!editable && (
          <PostFavoriteButton
            postId={post.id}
            currentUserId={currentUserId}
            existCount
          />
        )}
      </Box>
    )
  }, [currentUserId, displayDate, post, router, userData, editable])

  if (isLink) {
    return <Link href={`/post/${post.id}`}>{PostListItemContent}</Link>
  }
  return PostListItemContent
}
