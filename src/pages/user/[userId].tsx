import {
  Box,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { PostCard, SkeletonPostCard } from '~/components/domains/post/PostCard'
import { UserIcon } from '~/components/domains/user/UserIcon'
import { Text } from '~/components/parts/commons'
import { CurrentUserContext } from '~/hooks/CurrentUserProvider'
import { addApolloState, initializeApollo } from '~/lib/apolloClient'
import { GET_USER_BY_ID } from '~/queries'
import {
  GetUserQuery,
  GetUserQueryVariables,
  PostCategory,
  useGetPostsQuery,
  User,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  user?: User
}

const UserPage: NextPage<Props> = ({ user }) => {
  const router = useRouter()
  const { currentUser } = useContext(CurrentUserContext)

  const { data } = useGetPostsQuery({
    variables: {
      userId: user?.id,
      isPrivate: false,
    },
    fetchPolicy: 'cache-and-network',
  })

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
      <Box w="160px" mx="auto" mb="16px">
        <UserIcon user={user} size="full" />
      </Box>
      <Box textAlign="center" mb="24px">
        <Text fontSize="3xl" isBold>
          {user.name}
        </Text>
      </Box>
      <Text fontSize="lg">{user.description || ''}</Text>
      <Box mt="40px" maxW="780px" mx="auto">
        <Tabs size="lg" align="center" colorScheme="green" isFitted>
          <TabList mb="40px">
            <Tab>
              <Text fontSize="lg" isBold>
                出来ること
              </Text>
            </Tab>
            <Tab>
              <Text fontSize="lg" isBold>
                してほしいこと
              </Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box
                display="flex"
                flexWrap="wrap"
                gap="20px"
                alignItems="center"
                justifyContent="center"
              >
                {data ? (
                  data.GetPosts.filter(
                    (post) => post.category === PostCategory.GiveYou
                  ).map((post) => (
                    <Box key={post.id} w="100%" maxW="360px">
                      <PostCard
                        currentUserId={currentUser?.id}
                        post={post}
                        isLink
                      />
                    </Box>
                  ))
                ) : (
                  <Box w="100%" maxW="360px">
                    <SkeletonPostCard />
                  </Box>
                )}
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                display="flex"
                flexWrap="wrap"
                gap="20px"
                alignItems="center"
                justifyContent="center"
              >
                {data ? (
                  data.GetPosts.filter(
                    (post) => post.category === PostCategory.GiveMe
                  ).map((post) => (
                    <Box key={post.id} w="100%" maxW="360px">
                      <PostCard
                        currentUserId={currentUser?.id}
                        post={post}
                        isLink
                      />
                    </Box>
                  ))
                ) : (
                  <Box w="100%" maxW="360px">
                    <SkeletonPostCard />
                  </Box>
                )}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
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
