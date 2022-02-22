import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { initializeApollo } from '~/lib/apolloClient'
import { postFactory } from '~/mocks/factories'
import { PostCard } from './PostCard'

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

export const Default = Template.bind({})
Default.args = {
  post: postFactory(),
}
