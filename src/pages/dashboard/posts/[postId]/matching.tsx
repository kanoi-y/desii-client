import { Box } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'
import { PostCard } from '~/components/domains/post/PostCard'
import { SolidIcon, Text } from '~/components/parts/commons'
import { BREAKPOINTS } from '~/constants'
import { useWindowDimensions } from '~/hooks'
import { initializeApollo } from '~/lib/apolloClient'
import { GET_CURRENT_USER, GET_POST_BY_ID } from '~/queries'
import {
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  GetPostQuery,
  GetPostQueryVariables,
  Post,
  User,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  currentUser: User
  post: Post
}

const MatchingPage: NextPage<Props> = ({ currentUser, post }) => {
  const { width } = useWindowDimensions()

  return (
    <Box p={['28px 10px 0', '40px 20px 0']}>
      <Box mx="auto" maxW="700px">
        <PostCard
          post={post}
          isBig={width > BREAKPOINTS.sm}
          currentUserId={currentUser.id}
          isLink
        />
        <Box
          display="flex"
          alignItems="center"
          gap="4px"
          pb="16px"
          m="24px 0 16px"
          borderBottom="2px solid"
          borderColor="secondary.light"
        >
          <SolidIcon icon="SOLID_HEART" color="red.main" size={36} />
          <Text fontSize="lg" isBold>
            この投稿にマッチした投稿
          </Text>
        </Box>
        <Box></Box>
      </Box>
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
        post: getPost,
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
