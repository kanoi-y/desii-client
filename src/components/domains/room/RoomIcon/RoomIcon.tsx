import { Avatar } from '@chakra-ui/react'
import { VFC } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Link } from '~/components/parts/commons'
import {
  Room,
  useGetGroupByRoomIdQuery,
  useGetTargetRoomMemberQuery,
} from '~/types/generated/graphql'

type sizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

type Props = {
  room: Room
  currentUserId: string
  size?: sizeType
}

export const RoomIcon: VFC<Props> = ({ room, currentUserId, size = 'md' }) => {
  const { data: targetRoomMemberData } = useGetTargetRoomMemberQuery({
    variables: {
      roomId: room.id,
      userId: currentUserId,
    },
  })

  const { data: groupData } = useGetGroupByRoomIdQuery({
    variables: {
      roomId: room.id,
    },
  })

  if (groupData?.getGroupByRoomId) {
    return (
      <Link href={`/${groupData.getGroupByRoomId.productId}`}>
        <Avatar
          name={groupData.getGroupByRoomId.name}
          size={size}
          src={groupData.getGroupByRoomId.image}
          bg="white.main"
          _hover={{
            background: 'secondary.light',
          }}
        />
      </Link>
    )
  }

  if (targetRoomMemberData?.getTargetRoomMember) {
    return (
      <UserIcon
        user={targetRoomMemberData.getTargetRoomMember.user}
        size={size}
        isLink
      />
    )
  }

  return <GuestUserIcon size={size} />
}
