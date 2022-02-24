import { Box, SkeletonText } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { VFC } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import {
  IconButton,
  Link,
  OutlineIcon,
  SolidIcon,
  Tag,
  Text,
} from '~/components/parts/commons'
import {
  Post,
  useGetFavoritesQuery,
  useGetUserQuery,
} from '~/types/generated/graphql'

type Props = {
  post: Post
  currentUserId?: string
}

export const PostCard: VFC<Props> = ({ post, currentUserId }) => {
  const { data: FavoritesData } = useGetFavoritesQuery({
    variables: {
      postId: post.id,
    },
  })

  const { data: userData } = useGetUserQuery({
    variables: {
      getUserId: post.createdUserId,
    },
  })

  const displayDate = formatDistanceToNow(post.createdAt, {
    addSuffix: true,
    locale: ja,
  })

  const isFavorite =
    !!currentUserId &&
    FavoritesData?.GetFavorites.some(
      (favorite) => favorite.createdUserId === currentUserId
    )

  return (
    <Link href={`/${userData?.getUser?.id}/posts/${post.id}`}>
      <Box
        borderRadius="lg"
        overflow="hidden"
        boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
      >
        <Box
          backgroundImage={post.bgImage || 'images/Desii_bgImage.png'}
          backgroundSize="cover"
          backgroundPosition="center"
          w="100%"
          pt="52.5%"
          position="relative"
        >
          <Box position="absolute" top="12px" left="12px">
            <Tag
              text={
                post.category === 'GIVE_ME' ? 'してほしいこと' : '出来ること'
              }
              bgColor="orange.main"
              size="sm"
            />
          </Box>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="fit-content"
            maxW="90%"
          >
            <Text fontSize="lg" isBold noOfLines={3}>
              {post.title}
            </Text>
          </Box>
        </Box>
        <Box
          bgColor="primary.main"
          p="8px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap="8px">
            {userData?.getUser ? (
              <>
                <UserIcon user={userData.getUser} size="sm" />
                <Box>
                  <Text fontSize="md" isBold>
                    {userData.getUser.name}
                  </Text>
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
          <Box display="flex" alignItems="center" gap="4px">
            <Text fontSize="sm" noWrap isBold>
              {FavoritesData?.GetFavorites
                ? FavoritesData.GetFavorites.length.toString()
                : ''}
            </Text>
            {isFavorite ? (
              <IconButton
                icon={<SolidIcon icon="SOLID_STAR" color="orange.main" />}
                label="solidStar"
                bgColor="orange.light"
                isRound
              />
            ) : (
              <IconButton
                icon={<OutlineIcon icon="OUTLINE_STAR" />}
                label="outlineStar"
                isRound
              />
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  )
}
