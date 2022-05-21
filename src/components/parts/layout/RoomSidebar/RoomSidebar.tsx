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
      getRoomType: GetRoomType.OnlyOneOnOne,
    },
  })
  return (
    <Box
      p="28px 10px 0"
      borderRight="2px solid"
      borderLeft="2px solid"
      borderColor="secondary.light"
      maxW={{ base: '600px', md: '340px' }}
      width="100%"
      minH={`calc(100vh - ${SIZING.headerHeight})`}
    >
      <Box
        display="flex"
        alignItems="center"
        gap="4px"
        pb="16px"
        mb="16px"
        borderBottom="2px solid"
        borderColor="secondary.light"
      >
        <SolidIcon icon="SOLID_CHAT" size={36} />
        <Text fontSize="lg" isBold>
          メッセージ
        </Text>
      </Box>
      <Box display="flex" flexDirection="column" gap="12px">
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
