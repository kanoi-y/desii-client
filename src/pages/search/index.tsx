import {
  Box,
  Input,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { FormEvent, useContext, useState } from 'react'
import styled from 'styled-components'
import { PostCard, SkeletonPostCard } from '~/components/domains/post/PostCard'
import { SolidIcon, Text } from '~/components/parts/commons'
import { FooterLayout } from '~/components/parts/layout/FooterLayout'
import { CurrentUserContext } from '~/hooks/CurrentUserProvider'
import { PostOrderByType, useGetPostsQuery } from '~/types/generated/graphql'

const SearchPage: NextPage = () => {
  const { currentUser, isLoading } = useContext(CurrentUserContext)
  const [value, setValue] = useState('')
  const [postsPage, setPostsPage] = useState(1)

  const { data: postsData } = useGetPostsQuery({
    variables: {
      isPrivate: false,
      sort: PostOrderByType.Desc,
      searchText: value,
      limit: 50,
      page: postsPage,
    },
    fetchPolicy: 'cache-and-network',
  })

  const searchByKeyword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
  }

  if (isLoading) {
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
          <Box mb="48px">
            <StyledForm onSubmit={(e) => searchByKeyword(e)}>
              <Input
                size="lg"
                bgColor="secondary.light"
                boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="キーワード検索"
              />
              <StyledSearchButton>
                <SolidIcon icon="SOLID_SEARCH" />
              </StyledSearchButton>
            </StyledForm>
          </Box>
          <Tabs mt="40px" size="lg" colorScheme="green" variant="soft-rounded">
            <TabList mb="24px">
              <Tab>
                <Text fontSize="lg" isBold>
                  投稿
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
                  {postsData ? (
                    postsData.GetPosts.map((post) => (
                      <Box key={post.id} w="360px" maxW="100%">
                        <PostCard
                          post={post}
                          isLink
                          currentUserId={currentUser?.id}
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
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </FooterLayout>
  )
}

const StyledForm = styled.form`
  position: relative;
`

const StyledSearchButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  z-index: 100;
`

export default SearchPage
