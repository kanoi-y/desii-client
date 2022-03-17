import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { initializeApollo } from '~/lib/apolloClient'
import { postFactory } from '~/mocks/factories'
import { PostListItem } from './PostListItem'

export default {
  title: 'domains/post/PostListItem',
  component: PostListItem,
} as ComponentMeta<typeof PostListItem>

const Template: ComponentStory<typeof PostListItem> = ({ ...args }) => {
  const client = initializeApollo()
  return (
    <ApolloProvider client={client}>
      <Box p="20px">
        <PostListItem {...args} />
        <PostListItem {...args} />
        <PostListItem {...args} />
      </Box>
    </ApolloProvider>
  )
}

export const DefaultPostListItem = Template.bind({})
DefaultPostListItem.args = {
  post: postFactory({ title: 'プログラミングを教えてほしい！'}),
}

export const FavoritePostListItem = Template.bind({})
FavoritePostListItem.args = {
  post: postFactory({ title: 'プログラミングを教えてほしい！'}),
  currentUserId: 'userId',
}
