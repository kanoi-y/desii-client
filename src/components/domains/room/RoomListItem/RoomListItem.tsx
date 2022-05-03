import { Box } from '@chakra-ui/react'
import { useMemo, VFC } from 'react'
import { UserIcon } from '~/components/domains/user/UserIcon'
import { Link, Text } from '~/components/parts/commons'
import { Room } from '~/types/generated/graphql'
import { formatDistanceToNow } from '~/utils/formatDistanceToNow'

type Props = {
  room: Room
  currentUserId: string
}

export const RoomListItem: VFC<Props> = ({ room, currentUserId }) => {
  const displayDate = formatDistanceToNow(new Date(room.updatedAt))

  const latestMessage = useMemo(() => {
    if (!room.latestMessage) {
      return <Text fontSize="sm">{''}</Text>
    }

    const isCreatedUser = room.latestMessage.userId === currentUserId

    if (room.latestMessage.type === 'MEDIA') {
      return (
        <Text fontSize="sm">
          {isCreatedUser
            ? 'あなたが画像を送信しました'
            : `${room.latestMessage.user.name}さんが画像を送信しました`}
        </Text>
      )
    }

    if (room.latestMessage.type === 'POST') {
      return (
        <Text fontSize="sm">
          {isCreatedUser
            ? 'あなたが投稿に応募しました'
            : `${room.latestMessage.user.name}さんが投稿に応募しました`}
        </Text>
      )
    }

    return <Text fontSize="sm">{room.latestMessage.body}</Text>
  }, [room.latestMessage, currentUserId])
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      gap="16px"
      padding="8px 16px"
      cursor="pointer"
      _hover={{ bgColor: 'secondary.light' }}
    >
      <UserIcon user={currentUser} size="md" isLink />
      <Box>
        <Link href={`/user/${currentUser.id}`}>
          <Text fontSize="md" isBold color="primary.main">
            {currentUser.name}
          </Text>
        </Link>
        {latestMessage}
      </Box>
      <Box ml="auto">
        <Text fontSize="xs" isBold>
          {displayDate}
        </Text>
      </Box>
    </Box>
  )
}
