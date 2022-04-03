import { Badge, Box, Skeleton, SkeletonText, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { VFC } from 'react'
import { PostFavoriteButton } from '~/components/domains/post/PostFavoriteButton'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import {
  IconButton,
  Link,
  Menu,
  OutlineIcon,
  SolidIcon,
  Tag,
  Text,
} from '~/components/parts/commons'
import {
  Post,
  useDeletePostMutation,
  useGetUserQuery,
} from '~/types/generated/graphql'
import { formatDistanceToNow } from '~/utils/formatDistanceToNow'

type Props = {
  post: Post
  currentUserId?: string
  editable?: boolean
  count?: number
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
  count,
  isLink = false,
}) => {
  const router = useRouter()

  const { data: userData } = useGetUserQuery({
    variables: {
      getUserId: post.createdUserId,
    },
  })

  const [deletePostMutation] = useDeletePostMutation({
    refetchQueries: ['GetPosts'],
    variables: { deletePostId: post.id },
  })

  const displayDate = formatDistanceToNow(new Date(post.createdAt))

  return (
    <Box
      p="12px"
      display="flex"
      alignItems={editable ? 'flex-start' : 'flex-end'}
      justifyContent="space-between"
      borderBottom="2px solid"
      borderColor="secondary.light"
    >
      <Box>
        {count && (
          <Box display="flex" alignItems="center" mb="8px">
            <Text fontSize="sm" isBold>
              マッチ度：
            </Text>
            {[...Array(count)].map((c) => (
              <SolidIcon
                key={c}
                icon="SOLID_HEART"
                color="red.main"
                size={20}
              />
            ))}
          </Box>
        )}
        <Box display="flex" alignItems="center" gap="8px" mb="4px">
          {userData?.getUser ? (
            <>
              <Link href={`/user/${post.createdUserId}`}>
                <UserIcon user={userData.getUser} size="xs" />
              </Link>
              <Link href={`/user/${post.createdUserId}`}>
                <Text fontSize="sm" isBold color="primary.main">
                  {userData.getUser.name}
                </Text>
              </Link>
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
        {isLink ? (
          <Link href={`/post/${post.id}`}>
            <Text fontSize="md" isBold noOfLines={2}>
              {post.title}
            </Text>
          </Link>
        ) : (
          <Text fontSize="md" isBold noOfLines={2}>
            {post.title}
          </Text>
        )}
        <Box mt="12px">
          <Tag
            text={post.category === 'GIVE_ME' ? 'してほしいこと' : '出来ること'}
            bgColor="orange.main"
            size="sm"
          />
        </Box>
      </Box>
      {!editable ? (
        <PostFavoriteButton
          postId={post.id}
          currentUserId={currentUserId}
          existCount
        />
      ) : (
        <Box display="flex" alignItems="center" gap="4px">
          <Link href={`/dashboard/posts/${post.id}/matching`}>
            <Tooltip label="マッチした投稿を確認">
              <Box
                bgColor="primary.light"
                borderRadius="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p="4px"
              >
                <SolidIcon icon="SOLID_HEART" color="red.main" />
              </Box>
            </Tooltip>
          </Link>
          <Menu
            toggleItem={
              <SolidIcon
                icon="SOLID_CHEVRON_DOWN"
                size={28}
                color="text.light"
              />
            }
            menuList={[
              {
                text: '投稿を更新する',
                onClick: () => router.push(`/dashboard/posts/${post.id}`),
                icon: <SolidIcon icon="SOLID_REFRESH" size={20} />,
              },
              {
                text: '投稿を削除する',
                onClick: () => deletePostMutation(),
                icon: <SolidIcon icon="SOLID_TRASH" size={20} />,
              },
            ]}
          />
        </Box>
      )}
    </Box>
  )
}
