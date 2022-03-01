import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { PostCard } from '~/components/domains/post/PostCard'
import { BREAKPOINTS } from '~/constants'
import { useWindowDimensions } from '~/hooks'
import { CurrentUserContext } from '~/hooks/CurrentUserProvider'
import { addApolloState, initializeApollo } from '~/lib/apolloClient'
import { GET_POST_BY_ID } from '~/queries'
import {
  GetPostQuery,
  GetPostQueryVariables,
  Post,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  post: Post
}

const PostPage: NextPage<Props> = ({ post }) => {
  const router = useRouter()
  const { currentUser } = useContext(CurrentUserContext)

  const { width } = useWindowDimensions()

  if (router.isFallback) {
    // TODO: spinnerに変更する
    return <div>Loading...</div>
  }

  return (
    <Box p={['20px 10px', '40px 20px']}>
      <Box mx="auto" maxW="700px">
        <PostCard
          post={post}
          isBig={width > BREAKPOINTS.sm}
          currentUserId={currentUser?.id}
        />
      </Box>
      <Box></Box>
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
  context: GetStaticPropsContext<{ postId: string }>
) => {
  const postId = context.params?.postId

  if (!postId) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }

  try {
    const {
      data: { getPost },
    } = await client.query<GetPostQuery, GetPostQueryVariables>({
      query: GET_POST_BY_ID,
      variables: {
        getPostId: postId,
      },
    })

    if (!getPost) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      }
    }

    return addApolloState(client, {
      props: {
        post: getPost,
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
export default PostPage
