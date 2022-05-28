import { Box } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'
import { RoomIcon } from '~/components/domains/room/RoomIcon'
import { RoomName } from '~/components/domains/room/RoomName'
import { RoomSidebar } from '~/components/parts/layout/RoomSidebar'
import { SIZING } from '~/constants'
import { initializeApollo } from '~/lib/apolloClient'
import { GET_CURRENT_USER, GET_ROOM, GET_ROOM_MEMBERS } from '~/queries'
import {
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  GetRoomMembersQuery,
  GetRoomMembersQueryVariables,
  GetRoomQuery,
  GetRoomQueryVariables,
  Room,
  useGetMessagesQuery,
  User,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  currentUser: User
  room: Room
}

const RoomPage: NextPage<Props> = ({ currentUser, room }) => {
  const { data: messagesData } = useGetMessagesQuery({
    variables: {
      roomId: room.id,
    },
  })

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box display={{ base: 'none', md: 'block' }}>
        <RoomSidebar currentUser={currentUser} />
      </Box>
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        w="100%"
        h={`calc(100vh - ${SIZING.headerHeight})`}
      >
        <Box>
          <RoomIcon room={room} currentUserId={currentUser.id} />
          <RoomName room={room} currentUserId={currentUser.id} />
        </Box>
        <Box flex="1"></Box>
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
