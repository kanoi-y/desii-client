import { Box } from '@chakra-ui/react'
import { MouseEvent, useCallback, useMemo, VFC } from 'react'
import {
  IconButton,
  OutlineIcon,
  SolidIcon,
  Text,
} from '~/components/parts/commons'
import { useToast } from '~/hooks'
import {
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
  useGetFavoritesQuery,
} from '~/types/generated/graphql'

type Props = {
  postId: string
  currentUserId?: string
  isBig?: boolean
  existCount?: boolean
}

export const PostFavoriteButton: VFC<Props> = ({
  postId,
  currentUserId,
  isBig = false,
  existCount = false,
}) => {
  const { toast } = useToast()
  const { data: FavoritesData } = useGetFavoritesQuery({
    variables: {
      postId: postId,
    },
  })

  const [createFavoriteMutation] = useCreateFavoriteMutation({
    refetchQueries: ['GetFavorites'],
  })
  const [deleteFavoriteMutation] = useDeleteFavoriteMutation({
    refetchQueries: ['GetFavorites'],
  })

  const isFavorite = useMemo(() => {
    return (
      !!currentUserId &&
      FavoritesData?.GetFavorites.some(
        (favorite) => favorite.createdUserId === currentUserId
      )
    )
  }, [currentUserId, FavoritesData])

  const handleCreateFavorite = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      if (!currentUserId) {
        //TODO: ログインモーダルを表示する
        toast({ title: 'ログインが必要です!', status: 'warning' })
        return
      }
      try {
        await createFavoriteMutation({
          variables: {
            postId: postId,
          },
        })
      } catch (err) {
        toast({ title: 'リアクションの送信に失敗しました', status: 'error' })
      }
    },
    [createFavoriteMutation, postId, currentUserId, toast]
  )

  const handleDeleteFavorite = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      try {
        await deleteFavoriteMutation({
          variables: {
            postId: postId,
          },
        })
      } catch (err) {
        toast({ title: 'リアクションの送信に失敗しました', status: 'error' })
      }
    },
    [deleteFavoriteMutation, postId, toast]
  )

  return (
    <Box display="flex" alignItems="center" gap={isBig ? '8px' : '4px'}>
      {existCount && (
        <Text fontSize={isBig ? 'lg' : 'sm'} noWrap isBold>
          {FavoritesData?.GetFavorites
            ? FavoritesData.GetFavorites.length.toString()
            : ''}
        </Text>
      )}
      {isFavorite ? (
        <IconButton
          icon={
            <SolidIcon
              icon="SOLID_STAR"
              color="orange.main"
              size={isBig ? 30 : 24}
            />
          }
          label="solidStar"
          bgColor="orange.light"
          isRound
          onClick={handleDeleteFavorite}
          size={isBig ? 'lg' : 'md'}
        />
      ) : (
        <IconButton
          icon={<OutlineIcon icon="OUTLINE_STAR" size={isBig ? 30 : 24} />}
          label="outlineStar"
          isRound
          onClick={handleCreateFavorite}
          size={isBig ? 'lg' : 'md'}
        />
      )}
    </Box>
  )
}
