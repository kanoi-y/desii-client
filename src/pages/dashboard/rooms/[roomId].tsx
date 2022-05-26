import { Avatar, Box } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import React, { useMemo } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Link } from '~/components/parts/commons'
import { RoomSidebar } from '~/components/parts/layout/RoomSidebar'
import { initializeApollo } from '~/lib/apolloClient'
import { GET_CURRENT_USER, GET_ROOM, GET_ROOM_MEMBERS } from '~/queries'
import {
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  GetRoomMembersQuery,
  GetRoomMembersQueryVariables,
  GetRoomQuery,
  GetRoomQueryVariables,
  GetRoomType,
  Room,
  useGetMessagesQuery,
  useGetRoomsByLoginUserIdQuery,
  useGetTargetRoomMemberQuery,
  User,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  currentUser: User
  room: Room
}

const RoomPage: NextPage<Props> = ({ currentUser, room }) => {
  const { data } = useGetRoomsByLoginUserIdQuery({
    variables: {
      getRoomType: GetRoomType.OnlyOneOnOne,
    },
  })

  const { data: messagesData } = useGetMessagesQuery({
    variables: {
      roomId: room.id,
    },
  })

  const { data: targetRoomMemberData } = useGetTargetRoomMemberQuery({
    variables: {
      roomId: room.id,
      userId: currentUser.id,
    },
  })

  // RoomIcon componentを実装
  const RoomIcon = useMemo(() => {
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

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box w="100%" display={{ base: 'none', md: 'block' }}>
        <RoomSidebar currentUser={currentUser} />
      </Box>
      <Box p="28px" flex="1" display="flex" flexDirection="column">
        <Box>{RoomIcon}</Box>
        <Box></Box>
        <Box></Box>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const session = await getSession(ctx)
    const roomId = ctx.params?.roomId as string | undefined

    const {
      data: { getCurrentUser },
    } = await client.query<GetCurrentUserQuery, GetCurrentUserQueryVariables>({
      query: GET_CURRENT_USER,
      variables: {
        accessToken: session?.accessToken || '',
      },
    })

    const {
      data: { GetRoom },
    } = await client.query<GetRoomQuery, GetRoomQueryVariables>({
      query: GET_ROOM,
      variables: {
        getRoomId: roomId || '',
      },
      fetchPolicy: 'network-only',
    })

    if (!getCurrentUser || !GetRoom) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    const {
      data: { getRoomMembers },
    } = await client.query<GetRoomMembersQuery, GetRoomMembersQueryVariables>({
      query: GET_ROOM_MEMBERS,
      variables: {
        roomId: roomId || '',
      },
      fetchPolicy: 'network-only',
    })

    if (
      getRoomMembers.every(
        (roomMember) => roomMember.userId !== getCurrentUser.id
      )
    ) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    return {
      props: {
        currentUser: getCurrentUser,
        room: GetRoom,
      },
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }
}

export default RoomPage
