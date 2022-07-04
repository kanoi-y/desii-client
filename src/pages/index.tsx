import { Box, Spinner } from '@chakra-ui/react'
import styled from 'styled-components'
import React, { useContext } from 'react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PostCard, SkeletonPostCard } from '~/components/domains/post/PostCard'
import { Text } from '~/components/parts/commons'
import { FooterLayout } from '~/components/parts/layout/FooterLayout'
import { CurrentUserContext } from '~/hooks/CurrentUserProvider'
import { PostOrderByType, useGetPostsQuery } from '~/types/generated/graphql'

export default function Home() {
  const { currentUser, isLoading } = useContext(CurrentUserContext)

  const { data } = useGetPostsQuery({
    variables: {
      isPrivate: false,
      sort: PostOrderByType.Desc,
      take: 10,
      skip: 0,
    },
    fetchPolicy: 'cache-and-network',
  })

  const { data: favoritesData } = useGetPostsQuery({
    variables: {
      isPrivate: false,
      sort: PostOrderByType.Favorite,
      take: 10,
      skip: 0,
    },
    fetchPolicy: 'cache-and-network',
  })

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
      <Box width="100%" maxW="1200px" mx="auto" padding="32px 16px 24px">
        <Box mb="12px">
          <Text fontSize="xl" isHead isBold>
            最新の投稿
          </Text>
        </Box>
        <Box mb="40px">
          <StyledSwiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={32}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              600: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
              960: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            loop={true}
          >
            {data?.GetPosts ? (
              data.GetPosts.posts.map((post) => (
                <SwiperSlide key={post.id}>
                  <Box w="100%" maxW="360px">
                    <PostCard
                      currentUserId={currentUser?.id}
                      post={post}
                      isLink
                    />
                  </Box>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <SkeletonPostCard />
              </SwiperSlide>
            )}
          </StyledSwiper>
        </Box>
        <Box mb="12px">
          <Text fontSize="xl" isHead isBold>
            人気の投稿
          </Text>
        </Box>
        <StyledSwiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={32}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            960: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          loop={true}
        >
          {favoritesData?.GetPosts ? (
            favoritesData.GetPosts.posts.map((post) => (
              <SwiperSlide key={post.id}>
                <Box w="100%" maxW="360px">
                  <PostCard
                    currentUserId={currentUser?.id}
                    post={post}
                    isLink
                  />
                </Box>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <SkeletonPostCard />
            </SwiperSlide>
          )}
        </StyledSwiper>
      </Box>
    </FooterLayout>
  )
}

const StyledSwiper = styled(Swiper)`
  &.swiper {
    padding-bottom: 48px;
  }
  .swiper-pagination-bullet-active {
    background-color: #9ae6b4;
    transform: scale(1.4);
  }
`
