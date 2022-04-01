import { Box } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'
import { initializeApollo } from '~/lib/apolloClient'
import { GET_CURRENT_USER, GET_POST_BY_ID } from '~/queries'
import {
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  GetPostQuery,
  GetPostQueryVariables,
} from '~/types/generated/graphql'

const client = initializeApollo()

const MatchingPage: NextPage = () => {
  return (
    <Box textAlign="center">
      <p>Matching page</p>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const session = await getSession(ctx)
    const postId = ctx.params?.postId as string | undefined

    const {
      data: { getCurrentUser },
    } = await client.query<GetCurrentUserQuery, GetCurrentUserQueryVariables>({
      query: GET_CURRENT_USER,
      variables: {
        accessToken: session?.accessToken || '',
      },
    })

    const {
      data: { getPost },
    } = await client.query<GetPostQuery, GetPostQueryVariables>({
      query: GET_POST_BY_ID,
      variables: {
        getPostId: postId || '',
      },
      fetchPolicy: 'network-only',
    })

    if (!getCurrentUser || !getPost) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    if (getCurrentUser.id !== getPost.createdUserId) {
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

export default MatchingPage
