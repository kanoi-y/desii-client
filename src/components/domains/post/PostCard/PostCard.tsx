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
        >
          <Tag
            text={post.category === 'GIVE_ME' ? 'してほしいこと' : '出来ること'}
          />
          <Text fontSize="md" isBold>
            {post.title}
          </Text>
        </Box>
        <Box
          bgColor="primary.main"
          p="4px 8px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            {userData?.getUser ? (
              <>
                <UserIcon isLink user={userData.getUser} />
                <Box>
                  <Text fontSize="md" isBold>
                    {userData.getUser.name}
                  </Text>
                  <Text fontSize="sm">{displayDate}</Text>
                </Box>
              </>
            ) : (
              <>
                <GuestUserIcon />
                <SkeletonText w="40px" noOfLines={2} spacing="2" />
              </>
            )}
          </Box>
          <Box display="flex" alignItems="center">
            <Text fontSize="sm" noWrap>
              {FavoritesData?.GetFavorites
                ? FavoritesData.GetFavorites.length.toString()
                : ''}
            </Text>
            {isFavorite ? (
              <IconButton
                icon={<SolidIcon icon="SOLID_STAR" />}
                label="solidStar"
              />
            ) : (
              <IconButton
                icon={<OutlineIcon icon="OUTLINE_STAR" />}
                label="outlineStar"
              />
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  )
}
