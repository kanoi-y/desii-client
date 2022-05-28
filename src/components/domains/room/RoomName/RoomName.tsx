import { SkeletonText } from '@chakra-ui/react'
import { VFC } from 'react'
import { Link, Text } from '~/components/parts/commons'
import { Room, useGetTargetRoomMemberQuery } from '~/types/generated/graphql'

type sizeType =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'

type Props = {
  room: Room
  currentUserId: string
  size?: sizeType
}

export const RoomName: VFC<Props> = ({ room, currentUserId, size = 'md' }) => {
  const { data: targetRoomMemberData } = useGetTargetRoomMemberQuery({
    variables: {
      roomId: room.id,
      userId: currentUserId,
    },
  })

  if (room.group) {
    return (
      <Link href={`/${room.group.productId}`}>
        <Text fontSize={size} isBold color="primary.main">
          {room.group.name}
        </Text>
      </Link>
    )
  }

  if (targetRoomMemberData?.getTargetRoomMember) {
    return (
      <Link href={`/user/${targetRoomMemberData.getTargetRoomMember.userId}`}>
        <Text fontSize={size} isBold color="primary.main">
          {targetRoomMemberData.getTargetRoomMember.user.name}
        </Text>
      </Link>
    )
  }

  return <SkeletonText w="80px" noOfLines={1} fontSize={size} />
}
