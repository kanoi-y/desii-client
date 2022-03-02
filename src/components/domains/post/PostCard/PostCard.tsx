import { Box, Skeleton, SkeletonText } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { useRouter } from 'next/router'
import { useMemo, VFC } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import {
  IconButton,
  Link,
  OutlineIcon,
  Tag,
  Text,
} from '~/components/parts/commons'
import { Post, useGetUserQuery } from '~/types/generated/graphql'
import { PostFavoriteButton } from '../PostFavoriteButton'

type Props = {
  post: Post
  currentUserId?: string
  isBig?: boolean
  isLink?: boolean
}

export const SkeletonPostCard: VFC = () => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
    >
      <Skeleton>
        <Box w="100%" pt="52.5%"></Box>
      </Skeleton>
      <Box
        bgColor="primary.main"
        p="8px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" gap="8px">
          <GuestUserIcon size="sm" />
          <SkeletonText w="40px" noOfLines={2} spacing="2" />
        </Box>
        <Box display="flex" alignItems="center" gap="4px">
          <SkeletonText w="10px" noOfLines={1} />
          <IconButton
            icon={<OutlineIcon icon="OUTLINE_STAR" />}
            label="outlineStar"
            isRound
          />
        </Box>
      </Box>
    </Box>
  )
}

export const PostCard: VFC<Props> = ({
  post,
  currentUserId,
  isBig = false,
  isLink = false,
}) => {
  const router = useRouter()

  const { data: userData } = useGetUserQuery({
    variables: {
      getUserId: post.createdUserId,
    },
  })

  const displayDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: ja,
  })

  const PostCardContent = useMemo(() => {
    return (
      <Box
        borderRadius="lg"
        overflow="hidden"
        boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
        maxW="700px"
      >
        <Box
          backgroundImage={post.bgImage || 'images/Desii_bgImage.png'}
          backgroundSize="cover"
          backgroundPosition="center"
          w="100%"
          pt="52.5%"
          position="relative"
        >
          {post.bgImage && (
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              bgColor="rgba(240, 255, 244, 0.7)"
              zIndex="1"
            ></Box>
          )}
          <Box
            position="absolute"
            top={isBig ? '24px' : '12px'}
            left={isBig ? '24px' : '12px'}
            zIndex="2"
          >
            {/* TODO: post.categoryを変換するutilを作成 */}
            <Tag
              text={
                post.category === 'GIVE_ME' ? 'してほしいこと' : '出来ること'
              }
              bgColor="orange.main"
              size={isBig ? 'lg' : 'sm'}
            />
          </Box>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="fit-content"
            maxW="90%"
            zIndex="2"
          >
            <Text fontSize={isBig ? '3xl' : 'lg'} isBold noOfLines={3}>
              {post.title}
            </Text>
          </Box>
        </Box>
        <Box
          bgColor="primary.main"
          p={isBig ? '16px' : '8px'}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap={isBig ? '12px' : '8px'}>
            {userData?.getUser ? (
              <>
                <Box onClick={() => router.push(`/user/${post.createdUserId}`)}>
                  <UserIcon
                    user={userData.getUser}
                    size={isBig ? 'md' : 'sm'}
                  />
                </Box>
                <Box>
                  <Box
                    onClick={() => router.push(`/user/${post.createdUserId}`)}
                  >
                    <Text fontSize={isBig ? '2xl' : 'md'} isBold>
                      {userData.getUser.name}
                    </Text>
                  </Box>
                  <Text fontSize={isBig ? 'sm' : 'xs'}>{displayDate}</Text>
                </Box>
              </>
            ) : (
              <>
                <GuestUserIcon size={isBig ? 'lg' : 'sm'} />
                <SkeletonText w="40px" noOfLines={2} spacing="2" />
              </>
            )}
          </Box>
          <PostFavoriteButton
            postId={post.id}
            currentUserId={currentUserId}
            isBig={isBig}
            existCount
          />
        </Box>
      </Box>
    )
  }, [displayDate, isBig, post, currentUserId, userData, router])

  if (isLink) {
    return <Link href={`/post/${post.id}`}>{PostCardContent}</Link>
  }
  return PostCardContent
}
