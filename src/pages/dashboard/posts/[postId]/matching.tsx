import { Box } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'
import {
  PostListItem,
  SkeletonPostListItem,
} from '~/components/domains/post/PostListItem'
import { Link, SolidIcon, Text } from '~/components/parts/commons'
import { initializeApollo } from '~/lib/apolloClient'
import { GET_CURRENT_USER, GET_POST_BY_ID } from '~/queries'
import {
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  GetPostQuery,
  GetPostQueryVariables,
  Post,
  useGetMatchingPostsQuery,
  User,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  currentUser: User
  post: Post
}

const MatchingPage: NextPage<Props> = ({ currentUser, post }) => {
  const { data } = useGetMatchingPostsQuery({
    variables: {
      postId: post.id,
    },
  })

  return (
    <Box p={['28px 10px 0', '40px 20px 0']}>
      <Box mx="auto" maxW="700px">
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
          <Link href={`/post/${post.id}`}>
            <Text isBold color="primary.main" fontSize="xl">
              {post.title}
            </Text>
          </Link>
          <Text fontSize="md" isBold>
            にマッチした投稿
          </Text>
        </Box>
        <Box>
          {data ? (
            data.GetMatchingPosts.length !== 0 ? (
              data.GetMatchingPosts.map((matchingPost) => (
                <PostListItem
                  key={matchingPost.post.id}
                  currentUserId={currentUser.id}
                  post={matchingPost.post}
                  count={matchingPost.count}
                  isLink
                />
              ))
            ) : (
              <Box p="40px 0" textAlign="center">
                <Text fontSize="lg">まだ、マッチした投稿はありません！</Text>
              </Box>
            )
          ) : (
            <SkeletonPostListItem />
          )}
        </Box>
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
