import { Box } from '@chakra-ui/react'
import { VFC } from 'react'
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
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      gap="16px"
      padding="8px 16px"
      cursor="pointer"
      _hover={{ bgColor: 'secondary.light' }}
    >
      <Link href={`/user/${currentUser.id}`}>
        <UserIcon user={currentUser} size="md" />
      </Link>
      <Box>
        <Link href={`/user/${currentUser.id}`}>
          <Text fontSize="md" isBold color="primary.main">
            {currentUser.name}
          </Text>
        </Link>
        <Text fontSize="sm">{ room.latestMessage?.body }</Text>
      </Box>
      <Box ml="auto">
        <Text fontSize="xs" isBold>
          {displayDate}
        </Text>
      </Box>
    </Box>
  )
}
