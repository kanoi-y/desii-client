import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { initializeApollo } from '~/lib/apolloClient'
import { postFactory } from '~/mocks/factories'
import { PostListItem, SkeletonPostListItem } from './PostListItem'

export default {
  title: 'domains/post/PostListItem',
  component: PostListItem,
} as ComponentMeta<typeof PostListItem>

const Template: ComponentStory<typeof PostListItem> = ({ ...args }) => {
  const client = initializeApollo()
  return (
    <ApolloProvider client={client}>
      <Box>
        <PostListItem {...args} />
        <PostListItem {...args} />
        <PostListItem {...args} />
      </Box>
    </ApolloProvider>
  )
}

export const DefaultPostListItem = Template.bind({})
DefaultPostListItem.args = {
  post: postFactory({ title: 'プログラミングを教えてほしい！' }),
  isLink: false,
}

export const FavoritePostListItem = Template.bind({})
FavoritePostListItem.args = {
  post: postFactory({ title: 'プログラミングを教えてほしい！' }),
  currentUserId: 'userId',
}

export const EditablePostListItem = Template.bind({})
EditablePostListItem.args = {
  post: postFactory({ title: 'プログラミングを教えてほしい！' }),
  currentUserId: 'userId',
  editable: true,
}

export const ExistCountPostListItem = Template.bind({})
ExistCountPostListItem.args = {
  post: postFactory({ title: 'プログラミングを教えてほしい！' }),
  currentUserId: 'userId',
  count: 3,
}

const SkeletonTemplate: ComponentStory<typeof SkeletonPostListItem> = ({
  ...args
}) => {
  return (
    <Box p="20px">
      <SkeletonPostListItem {...args} />
    </Box>
  )
}

export const Skeleton = SkeletonTemplate.bind({})
