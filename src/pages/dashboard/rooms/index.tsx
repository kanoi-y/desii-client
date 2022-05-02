import { Box } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'
import { UserIcon } from '~/components/domains/user/UserIcon'
import { Link, SolidIcon, Text } from '~/components/parts/commons'
import { SIZING } from '~/constants'
import { initializeApollo } from '~/lib/apolloClient'
import { GET_CURRENT_USER } from '~/queries'
import {
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  User,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  currentUser: User
}

const RoomsPage: NextPage<Props> = ({ currentUser }) => {
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
        <Box>
          <Box
            display="flex"
            alignItems="flex-start"
            gap="16px"
            padding="8px 16px"
            cursor="pointer"
            _hover={{ bgColor: 'secondary.light' }}
          >
            <Link href={`/user/${currentUser.id}`}>
              <UserIcon user={currentUser} size="md" />
            </Link>
            <Box>
              <Link href={`/user/${currentUser.id}`}>
                <Text fontSize="md" isBold color="primary.main">
                  {currentUser.name}
                </Text>
              </Link>
              <Text fontSize="sm">ねこ、かわいいよね</Text>
            </Box>
            <Box ml="auto">
              <Text fontSize="xs" isBold>
                1日前
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box></Box>
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
