import { Avatar, Box, SkeletonText } from '@chakra-ui/react'
import { useMemo, VFC } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Link, Text } from '~/components/parts/commons'
import { Room, useGetTargetRoomMemberQuery } from '~/types/generated/graphql'
import { formatDistanceToNow } from '~/utils/formatDistanceToNow'

type Props = {
  room: Room
  currentUserId: string
}

export const SkeletonRoomListItem: VFC = () => {
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      gap="16px"
      padding="8px 16px"
      cursor="pointer"
      _hover={{ bgColor: 'secondary.light' }}
    >
      <GuestUserIcon />
      <Box>
        <SkeletonText w="80px" noOfLines={1} />
        <SkeletonText w="120px" noOfLines={1} mt="12px" />
      </Box>
      <Box ml="auto">
        <SkeletonText w="40px" noOfLines={1} />
      </Box>
    </Box>
  )
}

export const RoomListItem: VFC<Props> = ({ room, currentUserId }) => {
  const displayDate = formatDistanceToNow(new Date(room.updatedAt))

  const { data: targetRoomMemberData } = useGetTargetRoomMemberQuery({
    variables: {
      roomId: room.id,
      userId: currentUserId,
    },
  })

  const RoomListItemIcon = useMemo(() => {
    if (room.group) {
      return (
        <Link href={`/${room.group.productId}`}>
          <Avatar
            name={room.group.name}
            size="md"
            src={room.group.image}
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
          size="md"
          isLink
        />
      )
    }

    return <GuestUserIcon />
  }, [room.group, targetRoomMemberData?.getTargetRoomMember])

  const RoomListItemName = useMemo(() => {
    if (room.group) {
      return (
        <Link href={`/${room.group.productId}`}>
          <Text fontSize="md" isBold color="primary.main">
            {room.group.name}
          </Text>
        </Link>
      )
    }

    if (targetRoomMemberData?.getTargetRoomMember) {
      return (
        <Link href={`user/${targetRoomMemberData.getTargetRoomMember.userId}`}>
          <Text fontSize="md" isBold color="primary.main">
            {targetRoomMemberData.getTargetRoomMember.user.name}
          </Text>
        </Link>
      )
    }

    return <SkeletonText w="80px" noOfLines={1} />
  }, [room.group, targetRoomMemberData?.getTargetRoomMember])

  const LatestMessage = useMemo(() => {
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
      {RoomListItemIcon}
      <Box>
        {RoomListItemName}
        {LatestMessage}
      </Box>
      <Box ml="auto">
        <Text fontSize="xs" isBold>
          {displayDate}
        </Text>
      </Box>
    </Box>
  )
}
