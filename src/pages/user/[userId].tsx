import { Box, Spinner } from '@chakra-ui/react'
import { GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { UserIcon } from '~/components/domains/user/UserIcon'
import { addApolloState, initializeApollo } from '~/lib/apolloClient'
import { GET_USER_BY_ID } from '~/queries'
import {
  GetUserQuery,
  GetUserQueryVariables,
  User,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  user?: User
}

const UserPage: NextPage<Props> = ({ user }) => {
  const router = useRouter()
  if (router.isFallback || !user) {
    return (
      <Box
        w="100%"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="lg" />
      </Box>
    )
  }
  return (
    <Box p={['28px 10px 0', '40px 20px 0']}>
      <UserIcon user={user} size="lg" />
    </Box>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps = async (
  context: GetStaticPropsContext<{ userId: string }>
) => {
  const userId = context.params?.userId

  if (!userId) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }

  try {
    const {
      data: { getUser },
    } = await client.query<GetUserQuery, GetUserQueryVariables>({
      query: GET_USER_BY_ID,
      variables: {
        getUserId: userId,
      },
    })

    if (!getUser) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      }
    }

    return addApolloState(client, {
      props: {
        user: getUser,
      },
      revalidate: 30,
    })
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }
}

export default UserPage
