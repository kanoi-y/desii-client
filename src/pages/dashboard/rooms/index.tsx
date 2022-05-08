import { Box } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'
import { SkeletonPostListItem } from '~/components/domains/post/PostListItem'
import { RoomListItem } from '~/components/domains/room/RoomListItem'
import { SolidIcon, Text } from '~/components/parts/commons'
import { SIZING } from '~/constants'
import { initializeApollo } from '~/lib/apolloClient'
import { GET_CURRENT_USER } from '~/queries'
import {
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  GetRoomType,
  useGetRoomsByLoginUserIdQuery,
  User,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  currentUser: User
}

// TODO: レスポンシブデザインをする

const RoomsPage: NextPage<Props> = ({ currentUser }) => {
  const { data } = useGetRoomsByLoginUserIdQuery({
    variables: {
      getRoomType: GetRoomType.OnlyOneOnOne,
    },
  })
  return (
    <Box display="flex">
      <Box
        p="28px 10px 0"
        borderRight="2px solid"
        borderColor="secondary.light"
        maxW="100%"
        width="340px"
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
      <Box p="32px" flex="1">
        <Box
          bgColor="secondary.light"
          w="100%"
          h="100%"
          borderRadius="24px"
        ></Box>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const session = await getSession(ctx)

    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    const {
      data: { getCurrentUser },
    } = await client.query<GetCurrentUserQuery, GetCurrentUserQueryVariables>({
      query: GET_CURRENT_USER,
      variables: {
        accessToken: session.accessToken || '',
      },
    })

    if (!getCurrentUser) {
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

export default RoomsPage
