import { Box } from '@chakra-ui/react'
import { VFC } from 'react'
import { SkeletonPostListItem } from '~/components/domains/post/PostListItem'
import { RoomListItem } from '~/components/domains/room/RoomListItem'
import { SolidIcon, Text } from '~/components/parts/commons'
import { SIZING } from '~/constants'
import {
  GetRoomType,
  useGetRoomsByLoginUserIdQuery,
  User,
} from '~/types/generated/graphql'

type Props = {
  currentUser: User
}

export const RoomSidebar: VFC<Props> = ({ currentUser }) => {
  const { data } = useGetRoomsByLoginUserIdQuery({
    variables: {
      getRoomType: GetRoomType.All,
    },
    fetchPolicy: 'cache-and-network',
  })

  return (
    <Box
      borderRight="2px solid"
      borderLeft="2px solid"
      borderColor="secondary.light"
      width={{ base: '600px', md: '340px' }}
      maxW="100%"
    >
      <Box display="flex" alignItems="center" gap="4px" p="16px 12px">
        <SolidIcon icon="SOLID_CHAT" size={36} />
        <Text fontSize="lg" isBold>
          メッセージ
        </Text>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="12px"
        h={`calc(100vh - ${SIZING.headerHeight} - 70px)`}
        overflowY="auto"
        p="16px 0"
      >
        {data ? (
          data.GetRoomsByLoginUserId.map((room) => (
            <RoomListItem
              key={room.id}
              room={room}
              currentUserId={currentUser.id}
            />
          ))
        ) : (
          <>
            <SkeletonPostListItem />
            <SkeletonPostListItem />
            <SkeletonPostListItem />
          </>
        )}
      </Box>
    </Box>
  )
}
