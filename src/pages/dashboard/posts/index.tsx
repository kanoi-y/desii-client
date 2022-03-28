import { Box } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'
import {
  PostListItem,
  SkeletonPostListItem,
} from '~/components/domains/post/PostListItem'
import { SolidIcon, Text } from '~/components/parts/commons'
import { initializeApollo } from '~/lib/apolloClient'
import { GET_CURRENT_USER } from '~/queries'
import {
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  OrderByType,
  useGetPostsQuery,
  User,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  currentUser: User
}

const PostsPage: NextPage<Props> = ({ currentUser }) => {
  const { data } = useGetPostsQuery({
    variables: {
      userId: currentUser.id,
      sort: OrderByType.Desc,
    },
    fetchPolicy: 'cache-and-network',
  })

  return (
    <Box p={['28px 10px 0', '40px 20px 0']}>
      <Box mx="auto" maxW="700px">
        <Box
          display="flex"
          alignItems="center"
          gap="4px"
          pb="16px"
          mb="16px"
          borderBottom="2px solid"
          borderColor="secondary.light"
        >
          <SolidIcon
            icon="SOLID_DOCUMENT_TEXT"
            color="primary.main"
            size={36}
          />
          <Text fontSize="lg" isBold>
            投稿の管理
          </Text>
        </Box>
        <Box w="100%" display="flex" flexDirection="column" gap="16px">
          {data ? (
            data.GetPosts.map((post) => (
              <PostListItem
                key={post.id}
                currentUserId={currentUser.id}
                post={post}
                isLink
              />
            ))
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

export default PostsPage
