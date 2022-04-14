import { Box, Spinner, useDisclosure } from '@chakra-ui/react'
import { GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useMemo } from 'react'
import { PostCard } from '~/components/domains/post/PostCard'
import { PostFavoriteButton } from '~/components/domains/post/PostFavoriteButton'
import { Button, Link, Modal, Tag, Text } from '~/components/parts/commons'
import { BREAKPOINTS } from '~/constants'
import { useWindowDimensions } from '~/hooks'
import { CurrentUserContext } from '~/hooks/CurrentUserProvider'
import { addApolloState, initializeApollo } from '~/lib/apolloClient'
import { GET_POST_BY_ID } from '~/queries'
import { theme } from '~/theme'
import {
  GetPostQuery,
  GetPostQueryVariables,
  useGetPostQuery,
  useGetTagPostRelationsQuery,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  postId?: string
}

const PostPage: NextPage<Props> = ({ postId }) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { currentUser } = useContext(CurrentUserContext)

  const { width } = useWindowDimensions()

  const { data } = useGetTagPostRelationsQuery({
    variables: {
      postId: postId ? postId : '',
    },
  })

  const { data: postData } = useGetPostQuery({
    variables: {
      getPostId: postId ? postId : '',
    },
    fetchPolicy: 'cache-and-network',
  })

  const twitterUrl = useMemo(
    () =>
      `https://twitter.com/intent/tweet?url=${
        process.env.NEXT_PUBLIC_ROOT_URL + '/post/' + postId
      }&hashtags=Desii`,
    [postId]
  )

  const handleApplyButton = () => {
    console.log('応募する')
    // TODO: 投稿者とログインユーザーの間にroomを作成し、rooms/[roomId]に遷移するように実装
  }

  if (router.isFallback || !postId || !postData?.getPost) {
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
      <Box mx="auto" maxW="700px">
        <PostCard
          post={postData.getPost}
          isBig={width > BREAKPOINTS.sm}
          currentUserId={currentUser?.id}
        />
        <Box
          mt={['20px', '30px']}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Tag
              text={
                postData.getPost.category === 'GIVE_ME'
                  ? 'してほしいこと'
                  : '出来ること'
              }
              bgColor="orange.main"
              size="lg"
            />
            <Box mt="12px" display="flex" flexWrap="wrap" gap="8px">
              {data?.GetTagPostRelations.map((tagPostRelation) => (
                <Tag key={tagPostRelation.id} text={tagPostRelation.tag.name} />
              ))}
            </Box>
          </Box>
          {postData.getPost.createdUserId === currentUser?.id && (
            <Box>
              <Link href={`/dashboard/posts/${postId}`}>
                <Button>編集</Button>
              </Link>
            </Box>
          )}
        </Box>
        <Box
          m={['32px 0', '40px 0']}
          p="24px 16px"
          bgColor="white.main"
          borderRadius="md"
        >
          <Box fontWeight="bold" fontSize="16px" color="text.main">
            {postData.getPost.content}
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          {postData.getPost.createdUserId !== currentUser?.id && (
            <Button onClick={onOpen}>応募する</Button>
          )}
          <Box display="flex" alignItems="center" gap="12px" marginLeft="auto">
            <Link href={twitterUrl} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="#2b9ed5"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </Link>
            <PostFavoriteButton
              postId={postId}
              currentUserId={currentUser?.id}
            />
          </Box>
        </Box>
        <Modal
          title="この投稿に応募しますか？"
          isOpen={isOpen}
          onClose={onClose}
          body={
            <Box
              borderTop={`1px solid ${theme.colors.secondary.main}`}
              pt="12px"
              mt="-8px"
            >
              <Box mb="20px">
                <Text fontSize="md">
                  {/* FIXME: もっと適切な文言があれば修正する */}
                  投稿に応募すると、投稿者とのメッセージ交換が出来るようになります。
                </Text>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-around"
              >
                <Button onClick={onClose}>キャンセル</Button>
                <Button onClick={handleApplyButton}>応募する</Button>
              </Box>
            </Box>
          }
        />
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
      fetchPolicy: 'network-only',
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
        postId: getPost.id,
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
