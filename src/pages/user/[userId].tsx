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
import { useContext } from 'react'
import { PostCard, SkeletonPostCard } from '~/components/domains/post/PostCard'
import { UserIcon } from '~/components/domains/user/UserIcon'
import { Button, Link, Text } from '~/components/parts/commons'
import { FooterLayout } from '~/components/parts/layout/FooterLayout'
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
    <FooterLayout>
      <Box p={['28px 10px 0', '40px 20px 0']} position="relative">
        <Box maxW="780px" mx="auto">
          {user.id === currentUser?.id && (
            <Box position="absolute">
              <Link href="/dashboard">
                <Button>編集</Button>
              </Link>
            </Box>
          )}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb="16px"
          >
            <UserIcon user={user} size="2xl" />
          </Box>
          <Box textAlign="center" mb="24px">
            <Text fontSize="3xl" isBold>
              {user.name}
            </Text>
          </Box>
          <Box mx="auto" w="fit-content">
            <Text fontSize="lg">{user.description || ''}</Text>
          </Box>
          <Tabs mt="40px" size="lg" align="center" colorScheme="green" isFitted>
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
                  flexDirection={['column', 'row']}
                  alignItems="center"
                  gap="32px 24px"
                >
                  {data?.GetPosts ? (
                    data.GetPosts.posts.filter(
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
                    <>
                      <Box w="360px" maxW="100%">
                        <SkeletonPostCard />
                      </Box>
                      <Box w="360px" maxW="100%">
                        <SkeletonPostCard />
                      </Box>
                    </>
                  )}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  flexDirection={['column', 'row']}
                  alignItems="center"
                  gap="32px 24px"
                >
                  {data?.GetPosts ? (
                    data.GetPosts.posts.filter(
                      (post) => post.category === PostCategory.GiveMe
                    ).map((post) => (
                      <Box key={post.id} w="360px" maxW="100%">
                        <PostCard
                          currentUserId={currentUser?.id}
                          post={post}
                          isLink
                        />
                      </Box>
                    ))
                  ) : (
                    <>
                      <SkeletonPostCard />
                      <SkeletonPostCard />
                      <SkeletonPostCard />
                    </>
                  )}
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </FooterLayout>
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
