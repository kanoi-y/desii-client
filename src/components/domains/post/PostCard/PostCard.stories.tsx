import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { initializeApollo } from '~/lib/apolloClient'
import { postFactory } from '~/mocks/factories'
import { PostCard, SkeletonPostCard } from './PostCard'

export default {
  title: 'domains/post/PostCard',
  component: PostCard,
} as ComponentMeta<typeof PostCard>

const Template: ComponentStory<typeof PostCard> = ({ ...args }) => {
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      <Box p="20px">
        <PostCard {...args} />
      </Box>
    </ApolloProvider>
  )
}

export const DefaultPostCard = Template.bind({})
DefaultPostCard.args = {
  post: postFactory(),
}

export const BigPostCard = Template.bind({})
BigPostCard.args = {
  post: postFactory(),
  isBig: true,
}

export const FavoritePostCard = Template.bind({})
FavoritePostCard.args = {
  post: postFactory(),
  currentUserId: 'userId',
}

const SkeletonTemplate: ComponentStory<typeof SkeletonPostCard> = ({
  ...args
}) => {
  return (
    <Box p="20px">
      <SkeletonPostCard {...args} />
    </Box>
  )
}

export const Skeleton = SkeletonTemplate.bind({})
