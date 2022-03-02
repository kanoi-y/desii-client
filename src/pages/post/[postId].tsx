import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { PostCard } from '~/components/domains/post/PostCard'
import { PostFavoriteButton } from '~/components/domains/post/PostFavoriteButton'
import { Button, Tag } from '~/components/parts/commons'
import { BREAKPOINTS } from '~/constants'
import { useWindowDimensions } from '~/hooks'
import { CurrentUserContext } from '~/hooks/CurrentUserProvider'
import { addApolloState, initializeApollo } from '~/lib/apolloClient'
import { GET_POST_BY_ID } from '~/queries'
import {
  GetPostQuery,
  GetPostQueryVariables,
  Post,
  useGetTagPostRelationsQuery,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  post?: Post
}

const PostPage: NextPage<Props> = ({ post }) => {
  const router = useRouter()
  const { currentUser } = useContext(CurrentUserContext)

  const { width } = useWindowDimensions()

  const { data } = useGetTagPostRelationsQuery({
    variables: {
      postId: post ? post.id : '',
    },
  })

  const handleClickApplyButton = () => {
    // TODO: 応募した後の処理を実装する
    console.log('応募する')
  }

  if (router.isFallback || !post) {
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
        <Box mt={['20px', '30px']}>
          <Tag
            text={post.category === 'GIVE_ME' ? 'してほしいこと' : '出来ること'}
            bgColor="orange.main"
            size="lg"
          />
          <Box mt="12px" display="flex" flexWrap="wrap" gap="8px">
            {data?.GetTagPostRelations.map((tagPostRelation) => (
              <Tag key={tagPostRelation.id} text={tagPostRelation.tag.name} />
            ))}
          </Box>
        </Box>
        <Box
          m={['32px 0', '40px 0']}
          p="24px 16px"
          bgColor="white.main"
          borderRadius="md"
        >
          <Box fontWeight="bold" fontSize="16px" color="text.main">
            {post.content}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button onClick={handleClickApplyButton}>応募する</Button>
          <PostFavoriteButton
            postId={post.id}
            currentUserId={currentUser?.id}
          />
        </Box>
      </Box>
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
