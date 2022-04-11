import { Box, Spinner } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PostCard, SkeletonPostCard } from '~/components/domains/post/PostCard'
import { Text } from '~/components/parts/commons'
import { CurrentUserContext } from '~/hooks/CurrentUserProvider'
import { OrderByType, useGetPostsQuery } from '~/types/generated/graphql'

export default function Home() {
  const { currentUser, isLoading } = useContext(CurrentUserContext)

  const { data } = useGetPostsQuery({
    variables: {
      isPrivate: false,
      sort: OrderByType.Desc,
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
    <Box maxW="1200px" mx="auto">
      <Box my="24px">
        <Text fontSize="lg" isHead>
          新着
        </Text>
      </Box>
      <Box>
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            960: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {data ? (
            data.GetPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <Box w="100%" maxW="360px" mx="auto" p="0 16px">
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
        </Swiper>
      </Box>

      <Box w="360px" display="flex" flexDirection="column" gap="16px">
        {data ? (
          data.GetPosts.map((post) => (
            <PostCard
              key={post.id}
              currentUserId={currentUser?.id}
              post={post}
              isLink
            />
          ))
        ) : (
          <SkeletonPostCard />
        )}
      </Box>
    </Box>
  )
}
