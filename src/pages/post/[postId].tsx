import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext, NextPage } from 'next'
import React from 'react'
import { PostCard } from '~/components/domains/post/PostCard'
import { initializeApollo } from '~/lib/apolloClient'
import { GET_POSTS, GET_POST_BY_ID } from '~/queries'
import {
  GetPostQuery,
  GetPostQueryVariables,
  GetPostsQuery,
  Post,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  post: Post
}

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <Box p={['20px 10px', '40px 20px']}>
      <Box mx="auto" maxW="900px">
        <PostCard post={post} />
      </Box>
    </Box>
  )
}

export const getStaticPaths = async () => {
  const {
    data: { GetPosts },
  } = await client.query<GetPostsQuery, GetPostQueryVariables>({
    query: GET_POSTS,
  })
  const ids = GetPosts.map((post) => post.id.toString())
  const paths = ids.map((id) => ({ params: { id } }))

  return {
    paths,
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

    return {
      props: {
        post: getPost,
      },
      revalidate: 30,
    }
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
