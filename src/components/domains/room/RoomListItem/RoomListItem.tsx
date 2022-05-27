import { Box, SkeletonText } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMemo, VFC } from 'react'
import { RoomIcon } from '~/components/domains/room/RoomIcon'
import { GuestUserIcon } from '~/components/domains/user/UserIcon'
import { Link, Text } from '~/components/parts/commons'
import {
  Room,
  useGetMessageQuery,
  useGetTargetRoomMemberQuery,
} from '~/types/generated/graphql'
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
  const router = useRouter()
  const displayDate = formatDistanceToNow(new Date(room.updatedAt))

  const { data: targetRoomMemberData } = useGetTargetRoomMemberQuery({
    variables: {
      roomId: room.id,
      userId: currentUserId,
    },
  })

  const { data: latestMessageData } = useGetMessageQuery({
    variables: {
      getMessageId: room.latestMessageId || '',
    },
  })

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
        <Link href={`/user/${targetRoomMemberData.getTargetRoomMember.userId}`}>
          <Text fontSize="md" isBold color="primary.main">
            {targetRoomMemberData.getTargetRoomMember.user.name}
          </Text>
        </Link>
      )
    }

    return <SkeletonText w="80px" noOfLines={1} />
  }, [room.group, targetRoomMemberData?.getTargetRoomMember])

  const LatestMessage = useMemo(() => {
    if (!latestMessageData?.getMessage) {
      return <Text fontSize="sm">{''}</Text>
    }

    const isCreatedUser = latestMessageData.getMessage.userId === currentUserId

    if (latestMessageData.getMessage.type === 'MEDIA') {
      return (
        <Text fontSize="sm">
          {isCreatedUser
            ? 'あなたが画像を送信しました'
            : `${latestMessageData.getMessage.user.name}さんが画像を送信しました`}
        </Text>
      )
    }

    if (latestMessageData.getMessage.type === 'POST') {
      return (
        <Text fontSize="sm">
          {isCreatedUser
            ? 'あなたが投稿に応募しました'
            : `${latestMessageData.getMessage.user.name}さんが投稿に応募しました`}
        </Text>
      )
    }

    return <Text fontSize="sm">{latestMessageData.getMessage.body}</Text>
  }, [latestMessageData, currentUserId])

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      gap="16px"
      padding="8px 16px"
      cursor="pointer"
      position="relative"
      _hover={{ bgColor: 'secondary.light' }}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex="1"
        onClick={() => router.push(`/dashboard/rooms/${room.id}`)}
      ></Box>
      <Box zIndex="2">
        <RoomIcon room={room} currentUserId={currentUserId} />
      </Box>
      <Box zIndex="2">
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
