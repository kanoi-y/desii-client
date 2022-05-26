import { Box } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'
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
  useGetRoomsByLoginUserIdQuery,
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
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box w="100%" display={{ base: 'none', md: 'block' }}>
        <RoomSidebar currentUser={currentUser} />
      </Box>
      <Box p="32px" flex="1"></Box>
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
